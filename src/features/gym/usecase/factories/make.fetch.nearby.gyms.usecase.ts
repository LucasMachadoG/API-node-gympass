import { PrismaGymsRepository } from "../../repositories/prisma.gym.repository"
import { FetchNearbyGymsUseCase } from "../fetch.nearby.gym.usecase"

export function makeFetchNearbyGymsUsecase(){
  const gymsRepository = new PrismaGymsRepository()
  const usecase = new FetchNearbyGymsUseCase(gymsRepository)

  return usecase
}