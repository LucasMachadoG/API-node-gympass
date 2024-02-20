import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { PrismaUsersRepository } from "../../features/user/repositories/prisma.user.repository";
import { AuthenticateUserUsecase } from "../../features/user/usecases/user.authenticate";
import { InvalidCredentialsError } from "../../features/user/usecases/errors/invalid.credential.error";

export async function userAuthenticate(request: FastifyRequest, reply: FastifyReply){
  try{
    const authenticateBodySchema = z.object({
      email: z.string().email(),
      password: z.string().min(8)
    })
  
    const { email, password } = authenticateBodySchema.parse(request.body)

    const usersRepository = new PrismaUsersRepository()
    const authenticateUserUsecase = new AuthenticateUserUsecase(usersRepository)

    await authenticateUserUsecase.execute({
      email, 
      password
    })

    return reply.status(200).send()
  }catch(error: any){
    if(error instanceof InvalidCredentialsError){
      return reply.status(409).send({ message: error.message })
    }

    throw error
  }
}