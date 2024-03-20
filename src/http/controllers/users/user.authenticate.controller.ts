import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { InvalidCredentialsError } from "../../../features/user/usecases/errors/invalid.credential.error";
import { makeAuthenticateUsecase } from "../../../features/user/usecases/factories/make.authenticate.user.usecase";

export async function userAuthenticate(request: FastifyRequest, reply: FastifyReply){
  try{
    const authenticateBodySchema = z.object({
      email: z.string().email(),
      password: z.string().min(8)
    })
  
    const { email, password } = authenticateBodySchema.parse(request.body)

    const authenticateUserUsecase = makeAuthenticateUsecase()

    const { user } = await authenticateUserUsecase.execute({
      email, 
      password
    })

    const token = await reply.jwtSign({
      name: user.name
    }, {
      sign: {
        sub: user.id
      }
    })

    return reply.status(200).send({
      token
    })
  }catch(error: any){
    if(error instanceof InvalidCredentialsError){
      return reply.status(409).send({ message: error.message })
    }

    throw error
  }
}