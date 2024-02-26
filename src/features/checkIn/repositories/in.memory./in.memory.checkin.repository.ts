import { CheckIn, Prisma } from "@prisma/client";
import { CheckInRepository } from "../../contract/checkin.contract";
import { randomUUID } from "node:crypto";
import dayjs from "dayjs";

export class inMemoryCheckInsRepository implements CheckInRepository{
  public itens: CheckIn[] = []

  public async countByUserId(userId: string) {
    return this.itens.filter((checkin) => checkin.userId === userId).length
  }

  public async findMany(userId: string, page: number){
    return this.itens.filter((checkin) => checkin.userId === userId)
    .slice((page - 1) * 20, page * 20)
  }

  public async findByUserIdOnDate(userId: string, date: Date){
    const startOfTheDay = dayjs(date).startOf('date')
    const endOfTheDay = dayjs(date).endOf('date')

    const checkInOnSameDate = this.itens.find((checkin) => {
      const checkInDate = dayjs(checkin.createdAt)

      const isOnSameDate = checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay)

      return checkin.userId === userId && isOnSameDate
    })

    if(!checkInOnSameDate){
      return null
    }

    return checkInOnSameDate
  }

  public async create(data: Prisma.CheckInUncheckedCreateInput) {
    const currentDate = new Date();

    const checkin = {
      id: randomUUID(),
      userId: data.userId,
      gymId: data.gymId,
      validatedAt: data.validatedAt ? new Date(data.validatedAt) : null,
      createdAt: currentDate
    }

    this.itens.push(checkin)

    return checkin
  }
}