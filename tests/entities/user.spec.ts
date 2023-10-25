import InvalidEmailError from '../../src/entities/errors/invalid-email-error'
import User from '../../src/entities/user'
import { left } from '../../src/shared/either'

describe('User domain entity', () => {
  test('should not create user with invalid e-mail address', () => {
    const invalid_email: string = 'invalid_email'
    const error = User.create({ name: 'any name', email: invalid_email })

    expect(error).toEqual(left(new InvalidEmailError()))
  })
})
