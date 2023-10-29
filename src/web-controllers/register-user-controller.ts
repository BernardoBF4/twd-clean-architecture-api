import { UserData } from '@/entities'
import { RegisterUserOnMailingList } from '@/use-cases/register-user-on-mailing-list'
import { HttpRequest, HttpResponse } from '@/web-controllers/ports'
import { badRequest, created } from '@/web-controllers/util'
import { MissingParamError } from '@/web-controllers/errors'

export class RegisterUserController {
  private readonly usecase: RegisterUserOnMailingList

  constructor(usecase: RegisterUserOnMailingList) {
    this.usecase = usecase
  }

  public async handle(request: HttpRequest): Promise<HttpResponse> {
    if (!request.body.name || !request.body.email) {
      let missing_param = !request.body.name ? 'name ' : ''
      missing_param += !request.body.email ? 'email' : ''
      return badRequest(new MissingParamError(missing_param.trim()))
    }

    const user_data: UserData = request.body
    const response = await this.usecase.registerUserOnMailingList(user_data)

    if (response.isLeft()) {
      return badRequest(response.value)
    }

    if (response.isRight()) {
      return created(response.value)
    }
  }
}
