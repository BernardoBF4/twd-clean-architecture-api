import { UserRepository } from '@/use-cases/register-user-on-mailing-list/ports'
import { User, UserData } from '@/entities'
import { InvalidEmailError, InvalidNameError } from '@/entities/errors'
import { Either, left, right } from '@/shared'
import { UseCase } from '@/use-cases/ports'

export class RegisterUserOnMailingList implements UseCase {
  private readonly user_repo: UserRepository

  constructor(user_repo: UserRepository) {
    this.user_repo = user_repo
  }

  public async perform(
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
