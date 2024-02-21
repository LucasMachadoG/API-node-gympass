import { PrismaUsersRepository } from "../../repositories/prisma.user.repository"
import { CreateUserUsecase } from "../create.user.usecase"

export function makeCreateUsecase(){
  const usersRepository = new PrismaUsersRepository()
  const userCreateUsecase = new CreateUserUsecase(usersRepository)

  return userCreateUsecase
}