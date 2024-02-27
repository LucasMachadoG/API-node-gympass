import { beforeEach, describe, expect, test } from 'vitest'
import { inMemoryGymsRepository } from '../../../src/features/gym/repositories/in.memory/in.memory.gym.repository'
import { SearchGymUsecase } from '../../../src/features/gym/usecase/search.gym.usecase'

let gymRepository: inMemoryGymsRepository
let sut: SearchGymUsecase

describe('Search gym usecase', () => {
  beforeEach(async () => {
    gymRepository = new inMemoryGymsRepository
    sut = new SearchGymUsecase(gymRepository)
  })

  test('Should be able to search for gyms', async () => {
    const gym1 = await gymRepository.create({
      title: 'SmartFit',
      description: null,
      phone: null,
      latitude: -27.2092052,
      longitude: -49.6401091
    })

    const gym2 = await gymRepository.create({
      title: 'Coliseu',
      description: null,
      phone: null,
      latitude: -27.2092052,
      longitude: -49.6401091
    })

    const { gyms } = await sut.execute({
      query: 'SmartFit',
      page: 1
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'SmartFit' })])
  })

  test('Should be able to fetch paginated gym search', async () => {
    for(let i = 1; i <= 22; i++){
      await gymRepository.create({
        title: `SmartFit ${i}`,
        description: null,
        phone: null,
        latitude: -27.2092052,
        longitude: -49.6401091
      })

    }
    
    const { gyms } = await sut.execute({
      query: 'SmartFit',
      page: 2
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'SmartFit 21' }),
      expect.objectContaining({ title: 'SmartFit 22' })
    ])
  })
})