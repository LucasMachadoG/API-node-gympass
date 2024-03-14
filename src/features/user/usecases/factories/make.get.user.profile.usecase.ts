import { PrismaUsersRepository } from "../../repositories/prisma.user.repository"
import { GetUserUsecase } from "../get.user.usecase"

export function makeGetUserProfileUsecase(){
  const usersRepository = new PrismaUsersRepository()
  const usecase = new GetUserUsecase(usersRepository)

  return usecase
}