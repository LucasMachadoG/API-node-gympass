import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

import { makeFetchNearbyGymsUsecase } from "../../../features/gym/usecase/factories/make.fetch.nearby.gyms.usecase";


export async function fetchNearbyGyms(request: FastifyRequest, reply: FastifyReply){
  try{
    
    const fecthNearbyGymsSchema = z.object({
      latitude: z.number().refine(value => {
        return Math.abs(value) <= 90
      }),
      longitude: z.number().refine(value => {
        return Math.abs(value) <= 180
      })
    })
    
    const { latitude, longitude } = fecthNearbyGymsSchema.parse(request.body)
    
    const searchGymsUsecase = makeFetchNearbyGymsUsecase()

    const { gyms } = await searchGymsUsecase.execute({
      userLatitude: latitude,
      userLongitude: longitude
    })

    return reply.status(201).send({
      gyms
    })
  }catch(error: any){
    throw error
  }
}