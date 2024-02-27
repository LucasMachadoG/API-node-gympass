import { CheckIn } from "@prisma/client"
import { CheckInRepository } from "../contract/checkin.contract"
import { ResourceNotFound } from "../../user/usecases/errors/resource.not.found.error"


interface ValidatecheckInRequest{
  checkInId: string
}

interface ValidadeCheckInResponse{
  checkIn: CheckIn
}

export class ValidateCheckInUsecase{
  constructor(
    private checkInRepository: CheckInRepository,
  ){}

  public async execute({ checkInId }: ValidatecheckInRequest): Promise<ValidadeCheckInResponse>{
    const checkIn = await this.checkInRepository.findById(checkInId)

    if(!checkIn){
      throw new ResourceNotFound()
    }

    checkIn.validatedAt = new Date()

    await this.checkInRepository.save(checkIn)

    return {
      checkIn
    }
  }
}