import { beforeEach, describe, expect, test } from 'vitest'
import { CreateUserUsecase } from '../../../src/features/user/usecases/create.user.usecase'
import { compare, hash } from 'bcryptjs'
import { UserAlreadyExists } from '../../../src/features/user/usecases/errors/user.already.exists.error'
import { inMemoryUsersRepository } from '../../../src/features/user/repositories/in.memory/in.memory.users.repository'

let userRepository: inMemoryUsersRepository
let sut: CreateUserUsecase

describe('Create user usecase', () => {
  beforeEach(async () => {
    userRepository = new inMemoryUsersRepository()
    sut = new CreateUserUsecase(userRepository)
  })

  test('It must be possible to register the user', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    })

    expect(user.id).toEqual(expect.any(String))
  })

  test('The user password must be hashed', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    })

    const isPasswordCorrectlyHash = await compare(
      '123456',
      user.passwordHash
    )

    expect(isPasswordCorrectlyHash).toBe(true)
  })

  test("There cannot be a user with a repeated email", async () => {
    const email = 'johndoe@example.com'

    await sut.execute({
      name: 'John Doe',
      email,
      password: '123456'
    })

    await expect(() => 
      sut.execute({
        name: 'John Doe',
        email,
        password: '123456'
    }),
    ).rejects.toBeInstanceOf(UserAlreadyExists)
  })
})