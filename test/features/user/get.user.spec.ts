import { beforeEach, describe, expect, test } from 'vitest'
import { inMemoryUsersRepository } from '../../../src/features/user/repositories/in.memory/in.memory.users.repository'
import { hash } from 'bcryptjs'
import { GetUserUsecase } from '../../../src/features/user/usecases/get.user.usecase'
import { ResourceNotFound } from '../../../src/features/user/usecases/errors/resource.not.found.error'

let userRepository: inMemoryUsersRepository
let sut: GetUserUsecase


describe('Get user profile', () => {
  beforeEach(() => {
    userRepository = new inMemoryUsersRepository()
    sut = new GetUserUsecase(userRepository)
  })

  test('Should be able to get user profile', async () => {
    const createdUser = await userRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      passwordHash: await hash('123456', 6)
    })

    const { user } = await sut.execute({
      id: createdUser.id
    })

    expect(user.id).toEqual(expect.any(String))
    expect(user.name).toEqual('John Doe')
  })
  
  test('Should not be able to get user profile with wrong id', async () => {
    await expect(() => 
      sut.execute({
        id: 'non-existing-id'
      })
    ).rejects.toBeInstanceOf(ResourceNotFound)
  })
})