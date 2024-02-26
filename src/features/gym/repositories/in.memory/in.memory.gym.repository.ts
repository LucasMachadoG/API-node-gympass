import { Gym, Prisma } from "@prisma/client";
import { randomUUID } from "crypto";
import { GymsRepository } from "../../contract/gym.contract";

export class inMemoryGymsRepository implements GymsRepository{
  public itens: Gym[] = []

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