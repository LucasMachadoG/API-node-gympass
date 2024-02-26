import { CheckIn } from "@prisma/client";
import { CheckInRepository } from "../contract/checkin.contract";

interface FetchUserCheckInsHistoryRequest{
  userId: string
  page: number
}

interface FetchUserCheckInsHistoryResponse{
  checkIns: CheckIn[]
}

export class FetchUserCheckInsHistoryUsecase{
  constructor(private checkInsRepository: CheckInRepository){}

  public async execute({ userId, page }: FetchUserCheckInsHistoryRequest): Promise<FetchUserCheckInsHistoryResponse>{
    const checkIns = await this.checkInsRepository.findMany(userId, page)

    return {
      checkIns,
    }
  }
}