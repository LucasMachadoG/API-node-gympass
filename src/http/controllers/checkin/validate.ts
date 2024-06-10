import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeValidateCheckinUsecase } from '../../../features/checkIn/usecase/factories/make.validate.checkin.usecase'

export async function validateCheckin(request: FastifyRequest, reply: FastifyReply) {
  const validateCheckInParamsSchema = z.object({
    checkInId: z.string().uuid(),
  })

  const { checkInId } = validateCheckInParamsSchema.parse(request.params)

  const validateCheckInUseCase = makeValidateCheckinUsecase()

  await validateCheckInUseCase.execute({
    checkInId,
  })

  return reply.status(204).send()
}