import { PrismaGymsRepository } from "../../repositories/prisma.gym.repository"
import { CreateGymUsecase } from "../create.gym.usecase"
import { FetchNearbyGymsUseCase } from "../fetch.nearby.gym.usecase"

export function makeCreateGymUsecase(){
  const gymsRepository = new PrismaGymsRepository()
  const usecase = new CreateGymUsecase(gymsRepository)

  return usecase
}