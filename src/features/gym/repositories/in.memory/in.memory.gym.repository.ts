import { Gym } from "@prisma/client";
import { GymsRepository } from "../prisma.gym.repository";

export class inMemoryGymsRepository implements GymsRepository{
  public itens: Gym[] = []

  public async findById(id: string) {
    const gym = this.itens.find((item) => item.id === id)

    if(!gym){
      return null
    }

    return gym
  }
}