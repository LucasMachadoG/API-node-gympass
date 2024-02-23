import { CheckIn } from "@prisma/client"
import { CheckInRepository } from "../contract/checkin.contract"
import { GymsRepository } from "../../gym/repositories/prisma.gym.repository"
import { ResourceNotFound } from "../../user/usecases/errors/resource.not.found.error"
import { getDistanceBetweenCoordinates } from "../../utils/get.distance.betweeb.cordinates"

interface checkInRequest{
  userId: string
  gymId: string
  userLatitude: number
  userLongitude: number
}

interface checkInResponse{
  checkin: CheckIn
}

export class CheckInUsecase{
  constructor(
    private checkInRepository: CheckInRepository,
    private gymRepository: GymsRepository
  ){}

  public async execute({ userId, gymId, userLatitude, userLongitude }: checkInRequest): Promise<checkInResponse>{
    const gym = await this.gymRepository.findById(gymId)

    if(!gym){
      throw new ResourceNotFound()
    }

    const distance = getDistanceBetweenCoordinates(
      {
        latitude: userLatitude,
        longitude: userLongitude
      }, 
      {
        latitude: gym.latitude.toNumber(),
        longitude: gym.longitude.toNumber()
      }
    )

    const MAX_DISTANCE_IN_KILOMETERS = 0.1

    if(distance > MAX_DISTANCE_IN_KILOMETERS){
      throw new Error
    }
    
    const checkInOnSameDate = await this.checkInRepository.findByUserIdOnDate(
      userId,
      new Date()
    )

    if(checkInOnSameDate){
      throw new Error()
    }

    const checkin = await this.checkInRepository.create({
      userId,
      gymId
    })

    return {
      checkin
    }
  }
}