import { Gym, Prisma } from "@prisma/client";
import { GymsRepository } from "../contract/gym.contract";
import { Decimal } from "@prisma/client/runtime/library";
import { prisma } from "../../../lib/prisma.connection";

export class PrismaGymsRepository implements GymsRepository{
  public async findById(id: string) {
    const gym = await prisma.gym.findUnique({
      where: {
        id
      }
    })

    return gym
  }

  public async create(data: Prisma.GymCreateInput) {
    const gym  = await prisma.gym.create({
      data
    })

    return gym
  }
}