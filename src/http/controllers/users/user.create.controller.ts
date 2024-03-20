import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { UserAlreadyExists } from "../../../features/user/usecases/errors/user.already.exists.error";
import { makeCreateUsecase } from "../../../features/user/usecases/factories/make.create.user.usecase";


export async function userCreate(request: FastifyRequest, reply: FastifyReply){
  try{
    const createUsecase = makeCreateUsecase()

    const userSchema = z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string().min(8)
    })
  
    const { name, email, password } = userSchema.parse(request.body)

    await createUsecase.execute({
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