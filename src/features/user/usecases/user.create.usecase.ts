import { hash } from "bcryptjs"
import { UsersRepository } from "../utils/user.repository"
import { UserAlreadyExists } from "./errors/user.already.exists.error"

interface createUserRequest{
  name: string,
  email: string,
  password: string
}

export class UserCreateUsecase{
  constructor(private usersRepository: UsersRepository){}

  public async execute({ name, email, password }: createUserRequest){
    const passwordHash = await hash(password, 6)

    const userEmailAlreadyExists = await this.usersRepository.findByEmail(email)
  
    if(userEmailAlreadyExists){
      throw new UserAlreadyExists()
    }
    
    await this.usersRepository.create({
      name,
      email,
      passwordHash
    })
  }
}