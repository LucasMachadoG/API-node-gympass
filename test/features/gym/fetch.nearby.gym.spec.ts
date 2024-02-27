import { beforeEach, describe, expect, test } from 'vitest'
import { inMemoryGymsRepository } from '../../../src/features/gym/repositories/in.memory/in.memory.gym.repository'
import { FetchNearbyGymUsecase } from '../../../src/features/gym/usecase/fetch.nearby.gym.usecase'

let gymRepository: inMemoryGymsRepository
let sut: FetchNearbyGymUsecase

describe('Fetch nearby gyms usecase', () => {
  beforeEach(async () => {
    gymRepository = new inMemoryGymsRepository
    sut = new FetchNearbyGymUsecase(gymRepository)
  })

  test('Should be able to fetch nearby gyms', async () => {
    const gym1 = await gymRepository.create({
      title: 'Near gym',
      description: null,
      phone: null,
      latitude: -27.2092052,
      longitude: -49.6401091
    })

    const gym2 = await gymRepository.create({
      title: 'Far gym ',
      description: null,
      phone: null,
      latitude: -34.9976521,
      longitude: -61.1642894
    })

    const { gyms } = await sut.execute({
      userLatitude: -27.2092052,
      userLongitude: -49.6401091,
      page: 1
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Near gym' })])
  })

  test('Should be able to fetch nearby paginated gyms', async () => {
    for(let i = 1; i <= 22; i++){
      await gymRepository.create({
        title: `Nearby gym ${i}`,
        description: null,
        phone: null,
        latitude: -27.2092052,
        longitude: -49.6401091
      })

    }
    
    const { gyms } = await sut.execute({
      userLatitude: -27.2092052,
      userLongitude: -49.6401091,
      page: 2
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Nearby gym 21' }),
      expect.objectContaining({ title: 'Nearby gym 22' })
    ])
  })
})