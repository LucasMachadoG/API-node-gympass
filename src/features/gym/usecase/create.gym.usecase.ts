import { Gym } from "@prisma/client"
import {  } from "../repositories/prisma.gym.repository"
import { GymsRepository } from "../contract/gym.contract"

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