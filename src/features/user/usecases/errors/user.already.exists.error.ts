export class UserAlreadyExists extends Error{
  constructor(){
    super("Email já existe")
  }
}