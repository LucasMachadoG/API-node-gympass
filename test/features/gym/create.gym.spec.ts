import { beforeEach, describe, expect, test } from 'vitest'
import { inMemoryGymsRepository } from '../../../src/features/gym/repositories/in.memory/in.memory.gym.repository'
import { CreateGymUsecase } from '../../../src/features/gym/usecase/create.gym.usecase'
import { GymAlreadyExistsInThisLocation } from '../../../src/features/gym/usecase/error/gym.already.exists.in.this.location.error'

let gymRepository: inMemoryGymsRepository
let sut: CreateGymUsecase

describe('Create gym usecase', () => {
  beforeEach(async () => {
    gymRepository = new inMemoryGymsRepository
    sut = new CreateGymUsecase(gymRepository)
  })

  test('Should be able to create gym', async () => {
    const { gym } = await sut.execute({
      title: 'SmartFit',
      description: null,
      phone: null,
      latitude: -27.2092052,
      longitude: -49.6401091
    })

    expect(gym.id).toEqual(expect.any(String))
  })

  test("Shoud not be able create gym with same location", async () => {
    const latitude = -27.2092052;
    const longitude = -49.6401091;
    
    const gym1 = await sut.execute({
      title: 'SmartFit',
      description: null,
      phone: null,
      latitude,
      longitude 
    })

    await expect(() => 
      sut.execute({title: 'SmartFit',
      description: null,
      phone: null,
      latitude,
      longitude})
    ).rejects.toBeInstanceOf(GymAlreadyExistsInThisLocation)
  })
})