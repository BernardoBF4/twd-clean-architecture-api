import InMemoryUserRepository from '../../../../src/use-cases/register-user-on-mailing-list/repository/in-memory-user-repository'
import UserData from '../../../../src/use-cases/register-user-on-mailing-list/user-data'

describe('In memory User repository', () => {
  test('should return null if user is not found', async () => {
    const users: UserData[] = []
    const user_repo = new InMemoryUserRepository(users)
    const user = await user_repo.findUserByEmail('any@email.com')

    expect(user).toBe(null)
  })
})
