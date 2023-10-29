import { UserData } from '@/entities'
import { HttpRequest, HttpResponse } from '@/web-controllers/ports'
import { badRequest, created, serverError } from '@/web-controllers/util'
import { MissingParamError } from '@/web-controllers/errors'
import { UseCase } from '@/use-cases/ports'

export class RegisterUserController {
  private readonly usecase: UseCase

  constructor(usecase: UseCase) {
    this.usecase = usecase
  }

  public async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      if (!request.body.name || !request.body.email) {
        let missing_param = !request.body.name ? 'name ' : ''
        missing_param += !request.body.email ? 'email' : ''
        return badRequest(new MissingParamError(missing_param.trim()))
      }

      const user_data: UserData = request.body
      const response = await this.usecase.perform(user_data)

      if (response.isLeft()) {
        return badRequest(response.value)
      }

      if (response.isRight()) {
        return created(response.value)
      }
    } catch (error) {
      return serverError(error)
    }
  }
}
