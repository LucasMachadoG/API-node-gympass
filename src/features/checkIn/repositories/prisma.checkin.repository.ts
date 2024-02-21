import { Prisma } from "@prisma/client";
import { CheckInRepository } from "../contract/checkin.contract";
import { prisma } from "../../../lib/prisma.connection";

export class PrismaCheckInsRepository implements CheckInRepository{
  public async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkin = await prisma.checkIn.create({
      data
    })

    return checkin
  }
}