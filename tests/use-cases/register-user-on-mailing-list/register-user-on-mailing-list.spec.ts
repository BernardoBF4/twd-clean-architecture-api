import InvalidEmailError from '../../../src/entities/errors/invalid-email-error'
import UserData from '../../../src/entities/user-data'
import { left } from '../../../src/shared/either'
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

  /**
   * Neste caso, não queremos testar novamente cada caso de e-mail inválido;
   * queremos somente saber se quando houver um e-mail inválido, nos será
   * retornado a resposta que esperamos.
   */
  test('should not add user with invalid e-mail', async () => {
    const users: UserData[] = []
    const repo: UserRepository = new InMemoryUserRepository(users)
    const usecase: RegisterUserOnMailingList = new RegisterUserOnMailingList(repo)
    const name: string = 'any name'
    const invalid_email: string = 'anyemail'

    const response = await usecase.registerUserOnMailingList({ name, email: invalid_email })
    const user = await repo.findUserByEmail(invalid_email)

    expect(user).toBeNull()
    expect(response).toEqual(left(new InvalidEmailError()))
  })
})
