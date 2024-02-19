import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { prisma } from "../../lib/prisma.connection";

export async function userRegister(request: FastifyRequest, reply: FastifyReply){
  const userSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(8)
  })

  const { name, email, password } = userSchema.parse(request.body)

  const result = await prisma.user.create({
    data: {
      name,
      email,
      passwordHash: password
    }
  })

  return reply.status(201).send()
}