import { prisma } from "../../../lib/prisma.connection";
import { Prisma } from "@prisma/client";
import { UsersRepository } from "../contract/user.repository";

export class PrismaUsersRepository implements UsersRepository{
  public async findById(id: string) {
    const user = await prisma.user.findUnique({
      where: {
        id
      }
    })

    return user
  }
  public async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email
      }
    })

    return user
  }
  public async create(data: Prisma.UserCreateInput){
    const user = await prisma.user.create({
      data
    })

    return user
  }


}