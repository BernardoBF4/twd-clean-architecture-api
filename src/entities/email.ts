import { Either, left, right } from '../shared/either'
import InvalidEmailError from './errors/invalid-email-error'

export default class Email {
  private readonly email: string

  constructor(email: string) {
    this.email = email
  }

  static create(email: string): Either<InvalidEmailError, Email> {
    if (Email.validate(email)) {
      return right(new Email(email))
    }

    return left(new InvalidEmailError())
  }

  public static validate(email: string): boolean {
    const email_regex =
      /^[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/

    if (!email_regex.test(email)) {
      return false
    }

    if (!email) {
      return false
    }

    if (email.length > 320) {
      return false
    }

    const [local, domain] = email.split('@')

    if (local.length > 64 || local.length === 0) {
      return false
    }

    if (domain.length > 255 || domain.length === 0) {
      return false
    }

    const domain_parts = domain.split('.')
    if (domain_parts.some((domain_part) => domain_part.length > 63)) {
      return false
    }

    return true
  }
}
