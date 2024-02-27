import { beforeEach, afterEach, describe, expect, test, vi } from 'vitest'
import { inMemoryCheckInsRepository } from '../../../src/features/checkIn/repositories/in.memory./in.memory.checkin.repository'
import { ValidateCheckInUsecase } from '../../../src/features/checkIn/usecase/validate.checkin.usecase'
import { ResourceNotFound } from '../../../src/features/user/usecases/errors/resource.not.found.error'

let checkinRepository: inMemoryCheckInsRepository
let sut: ValidateCheckInUsecase

describe('Validate checkIn usecase', () => {
  beforeEach(async () => {
    checkinRepository = new inMemoryCheckInsRepository()
    sut = new ValidateCheckInUsecase(checkinRepository)

    // await gymRepository.create({
    //   id: 'gym_01',
    //   title: 'TesteGym',
    //   description: '',
    //   latitude: -27.2092052,
    //   longitude: -49.6401091,
    //   phone: ''
    // })

    // vi.useFakeTimers()
  })

  afterEach(() => {
    // vi.useRealTimers()
  })
  
  test('Should be able to validate checkin', async () => {
    const createdCheckIn = await checkinRepository.create({
      gymId: 'gym_01',
      userId: 'user_01'
    })

    const { checkIn } = await sut.execute({
      checkInId: createdCheckIn.id
    })

    expect(checkIn.validatedAt).toEqual(expect.any(Date))
    expect(checkinRepository.itens[0].validatedAt).toEqual(expect.any(Date))
  })

  test('Should not be able to validate an inexistent checkin', async () => {
    await expect(() => 
      sut.execute({
        checkInId: 'checkin-id'
      })
    ).rejects.toBeInstanceOf(ResourceNotFound)
  })
})