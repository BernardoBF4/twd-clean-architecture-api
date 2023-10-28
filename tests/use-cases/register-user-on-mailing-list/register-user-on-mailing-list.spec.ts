import InvalidEmailError from '../../../src/entities/errors/invalid-email-error'
import UserData from '../../../src/entities/user-data'
import UserRepository from '../../../src/use-cases/register-user-on-mailing-list/ports/user-repository'
import RegisterUserOnMailingList from '../../../src/use-cases/register-user-on-mailing-list/register-user-on-mailing-list'
import InMemoryUserRepository from '../../../src/use-cases/register-user-on-mailing-list/repository/in-memory-user-repository'

describe('Register user on mailing list use case', () => {
  test('should add user with complete data to mailing list', async () => {
    const users: UserData[] = []
    const repo: UserRepository = new InMemoryUserRepository(users)
    const usecase: RegisterUserOnMailingList = new RegisterUserOnMailingList(repo)
    const name: string = 'any name'
    const email: string = 'any@email.com'

    await usecase.registerUserOnMailingList({ name, email })
    const user = repo.findUserByEmail(email)

    expect((await user).name).toBe('any name')
  })
  })
})
