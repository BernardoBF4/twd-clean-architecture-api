import InvalidEmailError from '../../entities/errors/invalid-email-error'
import InvalidNameError from '../../entities/errors/invalid-name-error'
import User from '../../entities/user'
import UserData from '../../entities/user-data'
import { Either, left, right } from '../../shared/either'
import UserRepository from './ports/user-repository'

export default class RegisterUserOnMailingList {
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
