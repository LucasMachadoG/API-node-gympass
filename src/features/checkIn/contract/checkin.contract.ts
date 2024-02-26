import { CheckIn, Prisma } from "@prisma/client";

export interface CheckInRepository{
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
  findByUserIdOnDate(userId: string, data: Date): Promise<CheckIn | null>
  findMany(userId: string, page: number): Promise<CheckIn[]>
  countByUserId(userId: string): Promise<number>
}