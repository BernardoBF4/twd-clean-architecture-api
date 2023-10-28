import { UserData } from '@/entities'
import { RegisterUserOnMailingList } from '@/use-cases/register-user-on-mailing-list'
import { HttpRequest, HttpResponse } from '@/web-controllers/ports'
import { created } from '@/web-controllers/util'

export class RegisterUserController {
  private readonly usecase: RegisterUserOnMailingList

  constructor(usecase: RegisterUserOnMailingList) {
    this.usecase = usecase
  }

  public async handle(request: HttpRequest): Promise<HttpResponse> {
    const user_data: UserData = request.body
    const response = await this.usecase.registerUserOnMailingList(user_data)

    if (response.isRight()) {
      return created(response.value)
    }
  }
}
