import { Gym } from "@prisma/client";
import { GymsRepository } from "../contract/gym.contract";

interface fetchNearbyGymRequest{
  userLatitude: number
  userLongitude: number
  page: number
}

interface fetchNearbyGymResponse{
  gyms: Gym[]
}

export class FetchNearbyGymUsecase{
  constructor(private gymRepository: GymsRepository){}

  public async execute({ userLatitude, userLongitude, page }: fetchNearbyGymRequest): Promise<fetchNearbyGymResponse>{
    const gyms = await this.gymRepository.findManyNearby(userLatitude, userLongitude, page)

    return {
       gyms
    }
  }
}