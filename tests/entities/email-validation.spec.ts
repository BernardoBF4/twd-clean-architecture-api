import Email from '../../src/entities/email'

describe('E-mail validation', () => {
  test('should not accept null strings', () => {
    const email: null = null

    const ret: boolean = Email.validate(email)

    expect(ret).toBeFalsy()
  })

  test('should accept valid e-mail', () => {
    const email: string = 'any@email.com'

    const ret: boolean = Email.validate(email)

    expect(ret).toBeTruthy()
  })
})
