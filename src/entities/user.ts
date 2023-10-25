import { Either, left, right } from '../shared/either'
import Email from './email'
import InvalidEmailError from './errors/invalid-email-error'
import InvalidNameError from './errors/invalid-name-error'
import Name from './name'
import UserData from './user-data'

export default class User {
  public readonly email: Email
  public readonly name: Name

  private constructor(name: Name, email: Email) {
    this.name = name
    this.email = email
  }

  static create(user_data: UserData): Either<InvalidNameError | InvalidEmailError, User> {
    const name_or_error = Name.create(user_data.name)
    if (name_or_error.isLeft()) {
      return left(new InvalidNameError())
    }

    const email_or_error = Email.create(user_data.email)
    if (email_or_error.isLeft()) {
      return left(new InvalidEmailError())
    }

    const name: Name = name_or_error.value as Name
    const email: Email = email_or_error.value as Email
    return right(new User(name, email))
  }
}
