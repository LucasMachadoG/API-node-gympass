import { Gym } from "@prisma/client"
import {  } from "../repositories/prisma.gym.repository"
import { GymsRepository } from "../contract/gym.contract"

interface searchGymRequest{
  query: string
  page: number
}

interface searchGymResponse{
  gyms: Gym[]
}

export class SearchGymUsecase{
  constructor(private gymRepository: GymsRepository){}

  public async execute({ query, page }: searchGymRequest): Promise<searchGymResponse>{  
    const gyms = await this.gymRepository.searchMany(query, page)

    return {
      gyms
    }
  }
}