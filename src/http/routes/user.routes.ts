import { FastifyInstance } from "fastify"
import { userCreate } from "../controllers/user.create.controller"
import { userAuthenticate } from "../controllers/user.authenticate.controller"
import { profile } from "../controllers/user.profile.controller"
import { verifyJWT } from "../middleware/verify.jwt"

export async function userRoutes(app: FastifyInstance){
  app.post('/cadastrar', userCreate)
  app.post ('/login', userAuthenticate)

  //Authenticated routes 
  app.get('/me', { onRequest:[verifyJWT] }, profile)
}