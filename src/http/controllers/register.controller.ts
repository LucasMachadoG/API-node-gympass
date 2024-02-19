import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { prisma } from "../../lib/prisma.connection";
import { hash } from "bcryptjs"; 


export async function userRegister(request: FastifyRequest, reply: FastifyReply){
  const userSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(8)
  })

  const { name, email, password } = userSchema.parse(request.body)

  const passwordHash = await hash(password, 6)

  const userEmailAlreadyExists = await prisma.user.findUnique({
    where: {
      email
    }
  })

  if(userEmailAlreadyExists){
    reply.status(409).send()
  }

  const result = await prisma.user.create({
    data: {
      name,
      email,
      passwordHash
    }
  })

  return reply.status(201).send()
}