import { log } from 'console'
import Email from '../../src/entities/email'

describe('E-mail validation', () => {
  test('should not accept null strings', () => {
    const email: null = null

    const ret: boolean = Email.validate(email)

    expect(ret).toBeFalsy()
  })

  test('should not accept empty srings', () => {
    const email: string = ''

    const ret: boolean = Email.validate(email)

    expect(ret).toBeFalsy()
  })

  test('should accept valid e-mail', () => {
    const email: string = 'any@email.com'

    const ret: boolean = Email.validate(email)

    expect(ret).toBeTruthy()
  })

  test('should not accept local part larger than 64 characters', () => {
    const email: string = 'l'.repeat(65) + '@email.com'

    const ret: boolean = Email.validate(email)

    expect(ret).toBeFalsy()
  })

  test('should not accept domain part larger than 255 characters', () => {
    const email: string = 'local@' + 'd'.repeat(128) + '.' + 'd'.repeat(127)

    const ret: boolean = Email.validate(email)

    expect(ret).toBeFalsy()
  })

  test('should not accept whole email larger than 320 characters', () => {
    const email: string = 'l'.repeat(64) + '@' + 'd'.repeat(128) + '.' + 'd'.repeat(127)

    const ret: boolean = Email.validate(email)

    expect(ret).toBeFalsy()
  })

  test('should not accept empty local part', () => {
    const email: string = '@email.com'

    const ret: boolean = Email.validate(email)

    expect(ret).toBeFalsy()
  })

  test('should not accept empty domain', () => {
    const email: string = 'any@'

    const ret: boolean = Email.validate(email)

    expect(ret).toBeFalsy()
  })

  test('should not accept domain parts with more than 63 characters', () => {
    const email: string = 'any@' + 'd'.repeat(64) + '.com'

    const ret: boolean = Email.validate(email)

    expect(ret).toBeFalsy()
  })
})
