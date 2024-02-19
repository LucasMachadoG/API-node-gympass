import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { UserCreateUsecase } from "../../features/user/usecases/user.create.usecase";
import { PrismaUsersRepository } from "../../features/user/repositories/prisma.user.repository";
import { UserAlreadyExists } from "../../features/user/usecases/errors/user.already.exists.error";


export async function userRegister(request: FastifyRequest, reply: FastifyReply){
  try{
    const userSchema = z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string().min(8)
    })
  
    const { name, email, password } = userSchema.parse(request.body)

    const usersRepository = new PrismaUsersRepository()
    const userCreateUsecase = new UserCreateUsecase(usersRepository)

    await userCreateUsecase.execute({
      name,
      email, 
      password
    })

    return reply.status(201).send()
  }catch(error: any){
    if(error instanceof UserAlreadyExists){
      return reply.status(409).send({ message: error.message })
    }

    throw error
  }
}