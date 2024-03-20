import { Gym, Prisma } from "@prisma/client";
import { FindManyNearbyParams, GymsRepository } from "../contract/gym.contract";
import { prisma } from "../../../lib/prisma.connection";
import { Decimal } from "@prisma/client/runtime/library";

export class PrismaGymsRepository implements GymsRepository{
  public async findByLatitudeLongitude(latitude: Decimal, longitude: Decimal){
    const gym = await prisma.gym.findUnique({
      where: {
        latitude,
        longitude
      }
    })

    if(!gym){
      return null
    }

    return gym
  }

  public async findManyNearby({ latitude, longitude }: FindManyNearbyParams){
    const gyms = await prisma.$queryRaw<Gym[]>`
      SELECT * FROM 
      WHERE ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= 10
    `

    return gyms
  }

  public async findById(id: string){
    const gym = await prisma.gym.findUnique({
      where: {
        id
      }
    })

    return gym
  }
  public async create(data: Prisma.GymCreateInput){
    const gym = await prisma.gym.create({
      data
    })

    return gym
  }
  public async searchMany(query: string, page: number){
    const gyms = await prisma.gym.findMany({
      where: {
        title: {
          contains: query
        }
      },
      take: 20,
      skip: (page - 1) * 20
    })

    return gyms
  }


}