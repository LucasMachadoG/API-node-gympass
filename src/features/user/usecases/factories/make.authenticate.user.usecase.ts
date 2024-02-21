import { PrismaUsersRepository } from "../../repositories/prisma.user.repository"
import { AuthenticateUserUsecase } from "../authenticate.user.usecase"

export function makeAuthenticateUsecase(){
  const usersRepository = new PrismaUsersRepository()
  const authenticateUserUsecase = new AuthenticateUserUsecase(usersRepository)

  return authenticateUserUsecase
}