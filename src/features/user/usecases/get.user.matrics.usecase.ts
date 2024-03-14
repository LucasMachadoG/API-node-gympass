import { CheckInRepository } from "../../checkIn/contract/checkin.contract"

interface GetUserMatricsRequest{
  userId: string
}

interface GetUserMatricsResponse{
  checkInsCount: number
}

export class GetUserMetricsUsecase{
  constructor(private checkInsRepository: CheckInRepository){}

  public async execute({ userId }: GetUserMatricsRequest): Promise<GetUserMatricsResponse>{
    const checkInsCount = await this.checkInsRepository.countByUserId(userId)

    return {
      checkInsCount
    }
  }
}