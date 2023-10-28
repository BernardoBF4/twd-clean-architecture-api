export default class InvalidEmailError extends Error {
  public readonly name: string = 'InvalidEmailError'

  constructor(email: string) {
    super(`Invalid e-mail: ${email}.`)
  }
}
