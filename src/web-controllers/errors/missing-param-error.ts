export class MissingParamError extends Error {
  public readonly name: string = 'MissingParamError'

  constructor(param_name: string) {
    super(`Missing parameter from request: ${param_name}.`)
  }
}
