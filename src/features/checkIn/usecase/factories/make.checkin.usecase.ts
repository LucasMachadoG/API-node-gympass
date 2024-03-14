import { PrismaGymsRepository } from "../../../gym/repositories/prisma.gym.repository"
import { PrismaCheckInsRepository } from "../../repositories/prisma.checkin.repository"
import { CheckInUsecase } from "../checkin.usecase"


export function makeCheckinUsecase(){
  const checkinsRepository = new PrismaCheckInsRepository()
  const gymsRepository = new PrismaGymsRepository()
  const usecase = new CheckInUsecase(checkinsRepository, gymsRepository)

  return usecase
}