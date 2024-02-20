import { FastifyInstance } from "fastify"
import { userCreate } from "../controllers/user.create.controller"
import { userAuthenticate } from "../controllers/user.authenticate.controller"

export async function userRoutes(app: FastifyInstance){
  app.post('/cadastrar', userCreate)
  app.post ('/login', userAuthenticate)
}