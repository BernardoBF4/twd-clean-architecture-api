import { User } from '@/entities'

describe('User domain entity', () => {
  test('should not create user with invalid e-mail address', () => {
    const invalid_email: string = 'invalid_email'
    const error = User.create({ name: 'any name', email: invalid_email }).value as Error

    expect(error.name).toEqual('InvalidEmailError')
    expect(error.message).toEqual(`Invalid e-mail: ${invalid_email}.`)
  })

  test('should accept user with invalid name (too few characters)', () => {
    const invalid_name = 'O   '
    const error = User.create({ name: invalid_name, email: 'any@email.com' }).value as Error

    expect(error.name).toEqual('InvalidNameError')
    expect(error.message).toEqual(`Invalid name: ${invalid_name}.`)
  })

  // test('should accept user with invalid name (too many characters)', () => {
  //   const invalid_name = 'O'.repeat(257)
  //   const error = User.create({ name: invalid_name, email: 'any@email.com' })

  //   expect(error).toEqual(left(new InvalidNameError()))
  // })

  // test('should accept user with invalid name (too many characters)', () => {
  //   const invalid_name = 'O'.repeat(257)
  //   const error = User.create({ name: invalid_name, email: 'any@email.com' })

  //   expect(error).toEqual(left(new InvalidNameError()))
  // })

  test('should create user with valid data', () => {
    const valid_name = 'any name'
    const valid_email = 'any@email.com'
    const user: User = User.create({ name: valid_name, email: valid_email }).value as User

    expect(user.name.value).toEqual(valid_name)
    expect(user.email.value).toEqual(valid_email)
  })
})
