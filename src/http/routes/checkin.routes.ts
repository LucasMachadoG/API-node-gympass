import { FastifyInstance } from "fastify";
import { verifyJWT } from "../middleware/verify.jwt";
import { createCheckin } from "../controllers/checkin/create";
import { historyCheckin } from "../controllers/checkin/history";
import { verifyUserRole } from "../middleware/only.admin";
import { validateCheckin } from "../controllers/checkin/validate";

export async function checkinRoutes(app: FastifyInstance){
  app.addHook('onRequest', verifyJWT)

  app.post('/gyms/:gymId/checkins', createCheckin)
  app.get('/check-ins/history', historyCheckin)

  app.patch(
    '/check-ins/:checkInId/validate',
    { onRequest: [verifyUserRole('ADMIN')] },
    validateCheckin,
  )
}