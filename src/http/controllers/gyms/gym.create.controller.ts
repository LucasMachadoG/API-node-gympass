import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { UserAlreadyExists } from "../../../features/user/usecases/errors/user.already.exists.error";
import { makeCreateGymUsecase } from "../../../features/gym/usecase/factories/make.create.gym.usecase";
import { GymAlreadyExistsInThisLocation } from "../../../features/gym/usecase/error/gym.already.exists.in.this.location.error";


export async function gymCreate(request: FastifyRequest, reply: FastifyReply){
  try{
    const createGymUsecase = makeCreateGymUsecase()

    const createGymSchema = z.object({
      title: z.string(),
      description: z.string().nullable(),
      phone: z.string().nullable(),
      latitude: z.number().refine(value => {
        return Math.abs(value) <= 90
      }),
      longitude: z.number().refine(value => {
        return Math.abs(value) <= 180
      })
    })
  
    const { title, description, phone, latitude, longitude } = createGymSchema.parse(request.body)

    await createGymUsecase.execute({
      title,
      description,
      phone,
      latitude,
      longitude
    })

    return reply.status(201).send()
  }catch(error: any){
    if(error instanceof GymAlreadyExistsInThisLocation){
      return reply.status(409).send({ message: error.message })
    }

    throw error
  }
}