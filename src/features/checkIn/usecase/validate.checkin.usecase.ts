import { CheckIn } from "@prisma/client"
import { CheckInRepository } from "../contract/checkin.contract"
import { ResourceNotFound } from "../../user/usecases/errors/resource.not.found.error"
import dayjs from "dayjs"
import { LateCheckInValidationError } from "./error/late.checkin.validation.error"


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

    //Método diff do dayjs retorna a diferença entre duas datas
    const distanceInMinutosFromCheckInCreation = dayjs(new Date()).diff(checkIn.createdAt, "minute")

    if(distanceInMinutosFromCheckInCreation > 20){
      throw new LateCheckInValidationError
    }

    checkIn.validatedAt = new Date()

    await this.checkInRepository.save(checkIn)

    return {
      checkIn
    }
  }
}