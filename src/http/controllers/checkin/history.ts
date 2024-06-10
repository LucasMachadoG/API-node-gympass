import { FastifyReply, FastifyRequest } from "fastify"
import { makeFetchUserCheckinsHistoryUsecase } from "../../../features/checkIn/usecase/factories/make.fecth.user.checkins.history.usecase"
import z from "zod"

export async function historyCheckin(request: FastifyRequest, reply: FastifyReply) {
  const checkInHistoryQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  })

  const { page } = checkInHistoryQuerySchema.parse(request.query)

  const fetchUserCheckInsHistoryUseCase = makeFetchUserCheckinsHistoryUsecase()

  const { checkIns } = await fetchUserCheckInsHistoryUseCase.execute({
    page,
    userId: request.user.sub,
  })

  return reply.status(200).send({
    checkIns,
  })
}