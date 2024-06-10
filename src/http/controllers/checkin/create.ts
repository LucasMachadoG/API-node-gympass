import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeCheckinUsecase } from "../../../features/checkIn/usecase/factories/make.checkin.usecase";
import { ResourceNotFound } from "../../../features/user/usecases/errors/resource.not.found.error";
import { MaxDistanceError } from "../../../features/checkIn/usecase/error/max.distance.error";
import { MaxNumberOfCheckInsError } from "../../../features/checkIn/usecase/error/max.number.of.checkIns.error";

export async function createCheckin(request: FastifyRequest, reply: FastifyReply){
  try{
    const createCheckInParamsSchema = z.object({
      gymId: z.string().uuid(),
    })

    const createCheckinSchema = z.object({
      latitude: z.number().refine((value) => {
        return Math.abs(value) <= 90
      }),
      longitude: z.number().refine((value) => {
        return Math.abs(value) <= 180
      }),
    })
  
    const { gymId } = createCheckInParamsSchema.parse(request.params)
    const { latitude, longitude } = createCheckinSchema.parse(request.body)

    const checkInUseCase = makeCheckinUsecase()

    await checkInUseCase.execute({
      gymId,
      userId: request.user.sub,
      userLatitude: latitude,
      userLongitude: longitude,
    })

    return reply.status(201).send()
  }catch(error: any){
    if(error instanceof ResourceNotFound){
      return reply.status(404).send({ message: error.message })
    } else if(error instanceof MaxDistanceError){
      return reply.status(400).send({ message: error.message })
    } else if(error instanceof MaxNumberOfCheckInsError){
      return reply.status(400).send({ message: error.message })
    }

    throw error
  }
}