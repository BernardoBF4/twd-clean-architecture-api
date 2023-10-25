import { Either, left } from '../shared/either'
import Email from './email'
import InvalidEmailError from './errors/invalid-email-error'
import UserData from './user-data'

export default class User {
  static create(user_data: UserData): Either<InvalidEmailError, User> {
    const email_or_error = Email.create(user_data.email)

    if (email_or_error.isLeft()) {
      return left(new InvalidEmailError())
    }
  }
}
