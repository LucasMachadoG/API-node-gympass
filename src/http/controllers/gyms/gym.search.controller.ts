import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { UserAlreadyExists } from "../../../features/user/usecases/errors/user.already.exists.error";
import { makeSearchGymsUsecase } from "../../../features/gym/usecase/factories/make.search.gyms.usecase";


export async function searchGyms(request: FastifyRequest, reply: FastifyReply){
  try{
    const searchGymsUsecase = makeSearchGymsUsecase()

    const searchGymsSchema = z.object({
      query: z.string(),
      page: z.coerce.number().min(1).default(1)
    })
  
    const { query, page } = searchGymsSchema.parse(request.body)

    const { gyms } = await searchGymsUsecase.execute({
      query,
      page
    })

    return reply.status(201).send({
      gyms
    })
  }catch(error: any){
    throw error
  }
}