import InMemoryUserRepository from '../../../../src/use-cases/register-user-on-mailing-list/repository/in-memory-user-repository'
import UserData from '../../../../src/use-cases/register-user-on-mailing-list/user-data'

describe('In memory User repository', () => {
  test('should return null if user is not found', async () => {
    const users: UserData[] = []
    const user_repo = new InMemoryUserRepository(users)
    const user = await user_repo.findUserByEmail('any@email.com')

    expect(user).toBe(null)
  })

  test('should return user if it is found in the repository', async () => {
    const users: UserData[] = []
    const name: string = 'any name'
    const email: string = 'any@email.com'
    const user_repo = new InMemoryUserRepository(users)

    await user_repo.addUser({ name, email })
    const user = await user_repo.findUserByEmail('any@email.com')

    expect(user.name).toBe('any name')
  })
})
