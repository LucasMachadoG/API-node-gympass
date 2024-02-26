import { beforeEach, afterEach, describe, expect, test, vi } from 'vitest'
import { inMemoryCheckInsRepository } from '../../../src/features/checkIn/repositories/in.memory./in.memory.checkin.repository'
import { FetchUserCheckInsHistoryUsecase } from '../../../src/features/checkIn/usecase/fetch.user.checkins.history'

let checkinRepository: inMemoryCheckInsRepository
let sut: FetchUserCheckInsHistoryUsecase

describe('Fetch checkIn history usecase', () => {
  beforeEach(async () => {
    checkinRepository = new inMemoryCheckInsRepository()
    sut = new FetchUserCheckInsHistoryUsecase(checkinRepository)
  })
  
  test('Should be able to fetch checkins history', async () => {
    await checkinRepository.create({
      gymId: 'gym_01',
      userId: 'user_01'
    })

    await checkinRepository.create({
      gymId: 'gym_02',
      userId: 'user_01'
    })

    const { checkIns } = await sut.execute({
      userId: 'user_01',
      page: 1
    })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ gymId: 'gym_01'}),
      expect.objectContaining({ gymId: 'gym_02'}),
    ])
  })

  test('Should be able to fetch paginated checkin history', async () => {
    for(let i = 1; i <= 22; i++){
      await checkinRepository.create({
        gymId: `gym_${i}`,
        userId: 'user_01'
      })
    }

    const { checkIns } = await sut.execute({
      userId: 'user_01',
      page: 2
    })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ gymId: 'gym_21'}),
      expect.objectContaining({ gymId: 'gym_22'}),
    ])
  })
})