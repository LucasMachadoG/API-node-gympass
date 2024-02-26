import { beforeEach, afterEach, describe, expect, test, vi } from 'vitest'
import { inMemoryCheckInsRepository } from '../../../src/features/checkIn/repositories/in.memory./in.memory.checkin.repository'
import { GetUserMatricsUsecase } from '../../../src/features/user/usecases/get.user.matrics.usecase'

let checkinRepository: inMemoryCheckInsRepository
let sut: GetUserMatricsUsecase

describe('Get user matrics usecase', () => {
  beforeEach(async () => {
    checkinRepository = new inMemoryCheckInsRepository()
    sut = new GetUserMatricsUsecase(checkinRepository)
  })
  
  test('Should be able to get user metrics', async () => {
    await checkinRepository.create({
      gymId: 'gym_01',
      userId: 'user_01'
    })

    await checkinRepository.create({
      gymId: 'gym_02',
      userId: 'user_01'
    })

    const { checkInsCount } = await sut.execute({
      userId: 'user_01',
    })

    expect(checkInsCount).toEqual(2)
  })
})