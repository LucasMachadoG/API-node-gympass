import { beforeEach, describe, expect, test } from 'vitest'
import { inMemoryGymsRepository } from '../../../src/features/gym/repositories/in.memory/in.memory.gym.repository'
import { FetchNearbyGymsUseCase } from '../../../src/features/gym/usecase/fetch.nearby.gym.usecase'

let gymRepository: inMemoryGymsRepository
let sut: FetchNearbyGymsUseCase

describe('Fetch nearby gyms usecase', () => {
  beforeEach(async () => {
    gymRepository = new inMemoryGymsRepository
    sut = new FetchNearbyGymsUseCase(gymRepository)
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
      title: 'Far gym',
      description: null,
      phone: null,
      latitude: -31.8573722,
      longitude: -55.0561675
    })

    const { gyms } = await sut.execute({
      userLatitude: -27.2092052,
      userLongitude: -49.6401091
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Near gym' })])
  })
})