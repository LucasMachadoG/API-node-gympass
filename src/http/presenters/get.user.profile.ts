import { User } from "@prisma/client";

export class UserPresenter{
  public static toHTTP(user: User){
    return{
      id: user.id,
      name: user.name
    }
  }
}