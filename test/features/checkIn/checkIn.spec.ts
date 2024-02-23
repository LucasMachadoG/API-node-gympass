import { beforeEach, afterEach, describe, expect, test, vi } from 'vitest'
import { inMemoryCheckInsRepository } from '../../../src/features/checkIn/repositories/in.memory./in.memory.checkin.repository'
import { CheckInUsecase } from '../../../src/features/checkIn/usecase/checkin.usecase'

let checkinRepository: inMemoryCheckInsRepository
let sut: CheckInUsecase

describe('CheckIn usecase', () => {
  beforeEach(() => {
    checkinRepository = new inMemoryCheckInsRepository()
    sut = new CheckInUsecase(checkinRepository)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })
  
  test('Should be able to checkin', async () => {
    vi.setSystemTime(new Date(2022, 0, 15, 8, 0, 0))

    const { checkin } = await sut.execute({
      gymId: 'gym_01',
      userId: 'user_01'
    })

    expect(checkin.id).toEqual(expect.any(String))
  })

  test('Should not be able to checkin in twice in the same day', async () => {
    vi.setSystemTime(new Date(2022, 0, 15, 8, 0, 0))

    await sut.execute({
      gymId: 'gym_01',
      userId: 'user_01'
    })

    await expect(() => 
      sut.execute({
        gymId: 'gym_01',
        userId: 'user_01'
      })
    ).rejects.toBeInstanceOf(Error)
  })

  test('Should be able to checkin in twice but in different days', async () => {
    vi.setSystemTime(new Date(2022, 0, 15, 8, 0, 0))

    await sut.execute({
      gymId: 'gym_01',
      userId: 'user_01'
    })

    vi.setSystemTime(new Date(2022, 0, 24, 8, 0, 0))

    const { checkin } = await sut.execute({
      gymId: 'gym_01',
      userId: 'user_01'
    })

    expect(checkin.id).toEqual(expect.any(String))
  })
})