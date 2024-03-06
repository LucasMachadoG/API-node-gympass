import { CheckIn, Prisma } from "@prisma/client";
import { CheckInRepository } from "../contract/checkin.contract";
import { prisma } from "../../../lib/prisma.connection";
import dayjs from "dayjs";

export class PrismaCheckInsRepository implements CheckInRepository{
  public async create(data: Prisma.CheckInUncheckedCreateInput){
    const checkIn = await prisma.checkIn.create({
      data
    })

    return checkIn
  }

  public async findByUserIdOnDate(userId: string, date: Date){
    const startOfTheDay = dayjs(date).startOf('date')
    const endOfTheDay = dayjs(date).endOf('date')

    const checkIn = await prisma.checkIn.findFirst({
      where: {
        userId,
        createdAt: {
          gte: startOfTheDay.toDate(),
          lte: endOfTheDay.toDate()
        }
      }
    })

    return checkIn
  }
  public async findMany(userId: string, page: number){
    const checkIns = await prisma.checkIn.findMany({
      where: {
        userId: userId
      },
      take: 20,
      skip: (page - 1) * 20
    })

    return checkIns
  }

  public async findById(id: string){
    const checkIn = await prisma.checkIn.findUnique({
      where: {
        id
      }
    })

    return checkIn
  }

  public async countByUserId(userId: string){
    const count = await prisma.checkIn.count({
      where: {
        userId: userId
      }
    })

    return count
  }

  public async save(data: CheckIn){
    const checkIn = await prisma.checkIn.update({
      where: {
        id: data.id
      },
      data: data
    })

    return checkIn
  }
}