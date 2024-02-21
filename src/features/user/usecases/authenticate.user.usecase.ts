import { compare } from "bcryptjs";
import { UsersRepository } from "../contract/user.repository";
import { InvalidCredentialsError } from "./errors/invalid.credential.error";
import { User } from "@prisma/client";

interface AuthenticateUserRequest {
  email: string
  password: string
}

interface AuthenticateUserResponse {
  user: User
}

export class AuthenticateUserUsecase{
  constructor(private usersRepository: UsersRepository){}

  public async execute({ email, password }: AuthenticateUserRequest): Promise<AuthenticateUserResponse>{
    const user = await this.usersRepository.findByEmail(email)

    if(!user){
      throw new InvalidCredentialsError()
    }

    const doesPasswordMathes = await compare(password, user.passwordHash)

    if(!doesPasswordMathes){
      throw new InvalidCredentialsError()
    }

    return {
      user
    }
  }
}