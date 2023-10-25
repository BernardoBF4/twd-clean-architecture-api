import InvalidEmailError from '../../src/entities/errors/invalid-email-error'
import InvalidNameError from '../../src/entities/errors/invalid-name-error'
import User from '../../src/entities/user'
import { left } from '../../src/shared/either'

describe('User domain entity', () => {
  test('should not create user with invalid e-mail address', () => {
    const invalid_email: string = 'invalid_email'
    const error = User.create({ name: 'any name', email: invalid_email })

    expect(error).toEqual(left(new InvalidEmailError()))
  })

  test('should accept user with invalid name (too few characters)', () => {
    const invalid_name = 'O   '
    const error = User.create({ name: invalid_name, email: 'any@email.com' })

    expect(error).toEqual(left(new InvalidNameError()))
  })

  test('should accept user with invalid name (too many characters)', () => {
    const invalid_name = 'O'.repeat(257)
    const error = User.create({ name: invalid_name, email: 'any@email.com' })

    expect(error).toEqual(left(new InvalidNameError()))
  })
})
