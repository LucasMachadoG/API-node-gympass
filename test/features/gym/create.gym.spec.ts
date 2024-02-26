import { beforeEach, describe, expect, test } from 'vitest'
import { inMemoryUsersRepository } from '../../../src/features/user/repositories/in.memory/in.memory.users.repository'
import { inMemoryGymsRepository } from '../../../src/features/gym/repositories/in.memory/in.memory.gym.repository'
import { CreateGymUsecase } from '../../../src/features/gym/usecase/create.gym.usecase'

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
})