import { Gym } from "@prisma/client"
import { GymsRepository } from "../contract/gym.contract"
import { Decimal } from "@prisma/client/runtime/library"
import { GymAlreadyExistsInThisLocation } from "./error/gym.already.exists.in.this.location.error"

interface createGymRequest{
  title: string
  description: string | null
  phone: string | null
  latitude: number
  longitude: number
}

interface createGymResponse{
  gym: Gym
}

export class CreateGymUsecase{
  constructor(private gymRepository: GymsRepository){}

  public async execute({ title, description, phone, latitude, longitude }: createGymRequest): Promise<createGymResponse>{ 
    const gymWhithSameLocationAlreadyExists = await this.gymRepository.findByLatitudeLongitude(new Decimal(latitude), new Decimal(longitude))

    if(gymWhithSameLocationAlreadyExists){
      throw new GymAlreadyExistsInThisLocation()
    }

    const gym = await this.gymRepository.create({
      title,
      description,
      phone, 
      latitude,
      longitude
    })

    return {
      gym
    }
  }
}