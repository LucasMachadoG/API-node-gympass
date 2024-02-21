import { Prisma, User } from "@prisma/client";
import { UsersRepository } from "../../contract/user.repository";

export class inMemoryUsersRepository implements UsersRepository{
  public itens: User[] = []
  
  public async findById(id: string) {
    const user = this.itens.find((item) => item.id === id)

    if(!user){
      return null
    }

    return user
  }

  public async create(data: Prisma.UserCreateInput) {
    const currentDate = new Date();
      const user = {
        id: 'user-1',
        name: data.name,
        email: data.email,
        passwordHash: data.passwordHash,
        createdAt: currentDate,
        updatedAt: currentDate
      }

      this.itens.push(user)
      
      return user
    }
    
  public async findByEmail(email: string){
    const user = this.itens.find((item) => item.email === email)

    if(!user){
      return null
    }

    return user
  }

}