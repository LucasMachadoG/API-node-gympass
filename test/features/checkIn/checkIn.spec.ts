import { beforeEach, describe, expect, test } from 'vitest'
import { inMemoryCheckInsRepository } from '../../../src/features/checkIn/repositories/in.memory./in.memory.checkin.repository'
import { CheckInUsecase } from '../../../src/features/checkIn/usecase/checkin.usecase'

let checkinRepository: inMemoryCheckInsRepository
let sut: CheckInUsecase

describe('CheckIn usecase', () => {
  beforeEach(() => {
    checkinRepository = new inMemoryCheckInsRepository()
    sut = new CheckInUsecase(checkinRepository)
  })
  
  test('Should be able to checkin', async () => {
    const { checkin } = await sut.execute({
      gymId: 'gym_01',
      userId: 'user_01'
    })

    expect(checkin.id).toEqual(expect.any(String))
  })
})