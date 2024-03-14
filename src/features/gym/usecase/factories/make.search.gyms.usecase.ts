import { PrismaGymsRepository } from "../../repositories/prisma.gym.repository"
import { SearchGymUsecase } from "../search.gym.usecase"

export function makeSearchGymsUsecase(){
  const gymsRepository = new PrismaGymsRepository()
  const usecase = new SearchGymUsecase(gymsRepository)

  return usecase
}