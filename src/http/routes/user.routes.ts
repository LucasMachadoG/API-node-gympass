import { FastifyInstance } from "fastify"
import { userRegister } from "../controllers/register.controller"

export async function userRoutes(app: FastifyInstance){
  app.post('/', userRegister)
}