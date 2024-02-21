import { CheckIn } from "@prisma/client"
import { CheckInRepository } from "../contract/checkin.contract"

interface checkInRequest{
  userId: string
  gymId: string
}

interface checkInResponse{
  checkin: CheckIn
}

export class CheckInUsecase{
  constructor(private checkInRepository: CheckInRepository){}

  public async execute({ userId, gymId }: checkInRequest): Promise<checkInResponse>{
    const checkin = await this.checkInRepository.create({
      userId,
      gymId
    })

    return {
      checkin
    }
  }
}