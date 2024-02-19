import { FastifyInstance } from "fastify"
import { userRegister } from "../controllers/user.create.controller"

export async function userRoutes(app: FastifyInstance){
  app.post('/', userRegister)
}