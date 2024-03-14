import { PrismaCheckInsRepository } from "../../../checkIn/repositories/prisma.checkin.repository"
import { ValidateCheckInUsecase } from "../validate.checkin.usecase"

export function makeValidateCheckinUsecase(){
  const checkinsRepository = new PrismaCheckInsRepository()
  const usecase = new ValidateCheckInUsecase(checkinsRepository)

  return usecase
}