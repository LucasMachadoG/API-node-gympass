import { PrismaCheckInsRepository } from "../../../checkIn/repositories/prisma.checkin.repository"
import { FetchUserCheckInsHistoryUsecase } from "../fetch.user.checkins.history"

export function makeFetchUserCheckinsHistoryUsecase(){
  const checkinsRepository = new PrismaCheckInsRepository()
  const usecase = new FetchUserCheckInsHistoryUsecase(checkinsRepository)

  return usecase
}