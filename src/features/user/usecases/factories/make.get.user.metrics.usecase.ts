import { PrismaCheckInsRepository } from "../../../checkIn/repositories/prisma.checkin.repository"
import { GetUserMetricsUsecase } from "../get.user.matrics.usecase"


export function makeGetUserMetricsUsecase(){
  const checkinsRepository = new PrismaCheckInsRepository()
  const usecase = new GetUserMetricsUsecase(checkinsRepository)

  return usecase
}