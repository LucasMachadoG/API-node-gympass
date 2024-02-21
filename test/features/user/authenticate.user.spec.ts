import { beforeEach, describe, expect, test } from 'vitest'
import { inMemoryUsersRepository } from '../../../src/features/user/repositories/in.memory/in.memory.users.repository'
import { AuthenticateUserUsecase } from '../../../src/features/user/usecases/authenticate.user.usecase'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from '../../../src/features/user/usecases/errors/invalid.credential.error'

let userRepository: inMemoryUsersRepository
let sut: AuthenticateUserUsecase


describe('Authenticate user usecase', () => {
  beforeEach(() => {
    userRepository = new inMemoryUsersRepository()
    sut = new AuthenticateUserUsecase(userRepository)
  })
  
  test('Should be able to authenticate', async () => {
    await userRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      passwordHash: await hash('123456', 6)
    })

    const { user } = await sut.execute({
      email: "johndoe@example.com",
      password: '123456'
    })

    expect(user.id).toEqual(expect.any(String))
  })

  test('Should not be able to authenticate with wrong email', async () => {
    await expect(() => sut.execute({
      email: "johndoe@example.com",
      password: '123456'
    })).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  test('Should not be able to authenticate with wrong password', async () => {
    await userRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      passwordHash: await hash('123456', 6)
    })

    await expect(() => sut.execute({
      email: "johndoe@example.com",
      password: '8457934'
    })).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})