import UserData from '../../../src/use-cases/register-user-on-mailing-list/user.data'

describe('Register user on mailing list use case', () => {
  test('should add user with complete data to mailing list', async () => {
    const users: UserData[] = []
    const repo: UserRepository = new InMemoryUserRepository(users)
    const usecase: RegisterUserOnMailingList = new RegisterUserOnMailingList(repo)
    const name: string = 'any name'
    const email: string = 'any@email.com'

    const response = await usecase.registerUserOnMailingList({ name, email })
    const user = repo.findUserByEmail(email)

    expect((await user).name).toBe('any name')
  })
})
