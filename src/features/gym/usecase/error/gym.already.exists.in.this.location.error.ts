export class GymAlreadyExistsInThisLocation extends Error{
  constructor(){
    super("Já existe uma academia nessa localização.")
  }
}