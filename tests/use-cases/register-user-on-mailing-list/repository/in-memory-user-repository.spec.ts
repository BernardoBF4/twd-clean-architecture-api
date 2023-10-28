import InMemoryUserRepository from './in-memory-user-repository'
import UserData from '../../../../src/entities/user-data'

describe('In memory User repository', () => {
  test('should return null if user is not found', async () => {
    const users: UserData[] = []
    const sut = new InMemoryUserRepository(users) // "SUT" significa system under test; é a entidade/coisa que estamos testando
    const user = await sut.findUserByEmail('any@email.com')

    expect(user).toBe(null)
  })

  test('should return user if it is found in the repository', async () => {
    const users: UserData[] = []
    const name: string = 'any name'
    const email: string = 'any@email.com'
    const sut = new InMemoryUserRepository(users)

    await sut.addUser({ name, email })
    const user = await sut.findUserByEmail('any@email.com')

    expect(user.name).toBe('any name')
  })

  test('should return all users in the repository', async () => {
    const users: UserData[] = [
      { name: 'any name', email: 'any@email.com' },
      { name: 'second name', email: 'second@email.com' },
    ]
    const sut = new InMemoryUserRepository(users)

    const returned_users = await sut.findAllUsers()

    expect(returned_users.length).toBe(2)
  })
})
