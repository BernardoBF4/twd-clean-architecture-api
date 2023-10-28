import { UserRepository } from '@/use-cases/register-user-on-mailing-list/ports'
import { User, UserData } from '@/entities'
import { InvalidEmailError, InvalidNameError } from '@/entities/errors'
import { Either, left, right } from '@/shared'

export class RegisterUserOnMailingList {
  private readonly user_repo: UserRepository

  constructor(user_repo: UserRepository) {
    this.user_repo = user_repo
  }

  public async registerUserOnMailingList(
    request: UserData
  ): Promise<Either<InvalidEmailError | InvalidNameError, UserData>> {
    const user_or_error: Either<InvalidEmailError | InvalidNameError, User> = User.create(request)

    if (user_or_error.isLeft()) {
      return left(user_or_error.value)
    }

    if (!(await this.user_repo.exists(request))) {
      await this.user_repo.addUser(request)
    }

    return right(request)
  }
}
