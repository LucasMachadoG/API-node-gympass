import { FastifyInstance } from "fastify";
import { verifyJWT } from "../middleware/verify.jwt";
import { gymCreate } from "../controllers/gyms/gym.create.controller";
import { searchGyms } from "../controllers/gyms/gym.search.controller";
import { fetchNearbyGyms } from "../controllers/gyms/gym.fetch.controller";
import { verifyUserRole } from "../middleware/only.admin";


export async function gymsRoutes(app: FastifyInstance){
  app.addHook('onRequest', verifyJWT)

  app.post('/cadastrar/gym', { onRequest: [verifyUserRole('ADMIN')] }, gymCreate)
  app.get('/gyms/search', searchGyms)
  app.get('/gyms/nearby', fetchNearbyGyms)
}