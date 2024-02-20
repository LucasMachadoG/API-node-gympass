import { describe, expect, test } from 'vitest'
import { CreateUserUsecase } from '../../../src/features/user/usecases/user.create.usecase'
import { inMemoryUsersRepository } from '../../../src/features/user/repositories/in.memory/in.memory.users.repository'
import { AuthenticateUserUsecase } from '../../../src/features/user/usecases/user.authenticate'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from '../../../src/features/user/usecases/errors/invalid.credential.error'

describe('Create user usecase', () => {
  test('Should be able to authenticate', async () => {
    const userRepository = new inMemoryUsersRepository()
    const sut = new AuthenticateUserUsecase(userRepository)

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
    const userRepository = new inMemoryUsersRepository()
    const sut = new AuthenticateUserUsecase(userRepository)

    expect(() => sut.execute({
      email: "johndoe@example.com",
      password: '123456'
    })).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  test('Should not be able to authenticate with wrong password', async () => {
    const userRepository = new inMemoryUsersRepository()
    const sut = new AuthenticateUserUsecase(userRepository)

    await userRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      passwordHash: await hash('123456', 6)
    })

    expect(() => sut.execute({
      email: "johndoe@example.com",
      password: '8457934'
    })).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})