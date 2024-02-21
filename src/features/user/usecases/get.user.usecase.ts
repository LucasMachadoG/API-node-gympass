import { User } from "@prisma/client";
import { UsersRepository } from "../contract/user.contract";
import { ResourceNotFound } from "./errors/resource.not.found.error";

interface getUserRequest{
  id: string 
}

interface getUserResponse{
  user: User
}

export class GetUserUsecase{
  constructor(private userRepository: UsersRepository){}

  public async execute({ id }: getUserRequest): Promise<getUserResponse>{
    const user = await this.userRepository.findById(id)

    if(!user){
      throw new ResourceNotFound()
    }

    return {
      user
    }
  }
}