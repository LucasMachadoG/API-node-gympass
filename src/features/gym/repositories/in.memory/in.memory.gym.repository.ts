import { Gym, Prisma } from "@prisma/client";
import { randomUUID } from "crypto";
import { GymsRepository } from "../../contract/gym.contract";
import { getDistanceBetweenCoordinates } from "../../../utils/get.distance.betweeb.cordinates";

export class inMemoryGymsRepository implements GymsRepository{
  public itens: Gym[] = []

  public async findManyNearby(userLatitude: number, userLongitude: number, page: number) {
    return this.itens.filter((item) => {
      const distance = getDistanceBetweenCoordinates(
        {latitude: userLatitude, longitude: userLongitude},
        {latitude: item.latitude.toNumber(), longitude: item.longitude.toNumber()}
      )

      return distance < 10
    }).slice((page - 1) * 20, page * 20)
  }

  public async searchMany(query: string, page: number) {
    return this.itens.filter((item) => item.title.includes(query)).slice((page - 1) * 20, page * 20)
  }

  public async findById(id: string) {
    const gym = this.itens.find((item) => item.id === id)

    if(!gym){
      return null
    }

    return gym
  }

  public async create(data: Prisma.GymCreateInput){
    const gym = {
      id: data.id ?? randomUUID(),
      title: data.title,
      description: data.description ?? null,
      phone: data.phone ?? null,
      latitude: new Prisma.Decimal(data.latitude.toString()),
      longitude: new Prisma.Decimal(data.longitude.toString()),
      createdAt: new Date()
    }

    this.itens.push(gym)

    return gym
  }
}