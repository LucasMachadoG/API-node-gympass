import { prisma } from "../../../lib/prisma.connection";
import { Prisma } from "@prisma/client";
import { UsersRepository } from "../utils/user.repository";

Prisma.UserScalarFieldEnum

export class PrismaUsersRepository implements UsersRepository{
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