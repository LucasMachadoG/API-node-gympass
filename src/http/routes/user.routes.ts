import { FastifyInstance } from "fastify"
import { userCreate } from "../controllers/users/user.create.controller"
import { userAuthenticate } from "../controllers/users/user.authenticate.controller"
import { profile } from "../controllers/users/user.profile.controller"
import { verifyJWT } from "../middleware/verify.jwt"

export async function userRoutes(app: FastifyInstance){
  app.post('/cadastrar', userCreate)
  app.post ('/login', userAuthenticate)

  //Authenticated routes 
  app.get('/me', { onRequest:[verifyJWT] }, profile)
}