import { Either, left } from '../shared/either'
import Email from './email'
import InvalidEmailError from './errors/invalid-email-error'
import InvalidNameError from './errors/invalid-name-error'
import Name from './name'
import UserData from './user-data'

export default class User {
  static create(user_data: UserData): Either<InvalidNameError | InvalidEmailError, User> {
    const name_or_error = Name.create(user_data.name)
    if (name_or_error.isLeft()) {
      return left(new InvalidNameError())
    }

    const email_or_error = Email.create(user_data.email)
    if (email_or_error.isLeft()) {
      return left(new InvalidEmailError())
    }
  }
}
