import { hash } from "bcryptjs"
import { UsersRepository } from "../contract/user.contract"
import { UserAlreadyExists } from "./errors/user.already.exists.error"
import { User } from "@prisma/client"

interface createUserRequest{
  name: string,
  email: string,
  password: string
}

interface createUserResponse{
  user: User
}

export class CreateUserUsecase{
  constructor(private usersRepository: UsersRepository){}

  public async execute({ name, email, password }: createUserRequest): Promise<createUserResponse>{
    const passwordHash = await hash(password, 6)

    const userEmailAlreadyExists = await this.usersRepository.findByEmail(email)
  
    if(userEmailAlreadyExists){
      throw new UserAlreadyExists()
    }
    
    const user = await this.usersRepository.create({
      name,
      email,
      passwordHash
    })

    return {
      user
    }
  }
}