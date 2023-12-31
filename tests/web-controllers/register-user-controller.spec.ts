import { UserData } from '@/entities'
import { InvalidEmailError, InvalidNameError } from '@/entities/errors'
import { UseCase } from '@/use-cases/ports'
import { RegisterUserOnMailingList } from '@/use-cases/register-user-on-mailing-list'
import { UserRepository } from '@/use-cases/register-user-on-mailing-list/ports'
import { RegisterUserController } from '@/web-controllers'
import { MissingParamError } from '@/web-controllers/errors/missing-param-error'
import { HttpRequest, HttpResponse } from '@/web-controllers/ports'
import { InMemoryUserRepository } from '@test/use-cases/register-user-on-mailing-list/repository'

describe('Register user web contoller', () => {
  const users: UserData[] = []
  const repo: UserRepository = new InMemoryUserRepository(users)
  const usecase: UseCase = new RegisterUserOnMailingList(repo)
  const controller: RegisterUserController = new RegisterUserController(usecase)

  class ErrorThrowingUseCaseStub implements UseCase {
    perform(request: any): Promise<void> {
      throw new Error()
    }
  }

  test('should return status code 201 when request contains valid user data', async () => {
    const request: HttpRequest = {
      body: {
        name: 'any name',
        email: 'any@email.com',
      },
    }

    const response: HttpResponse = await controller.handle(request)

    expect(response.status_code).toBe(201)
    expect(response.body).toEqual(request.body)
  })

  test('should return status code 400 when request contains invalid name', async () => {
    const request_with_invalid_name: HttpRequest = {
      body: {
        name: 'a',
        email: 'any@email.com',
      },
    }

    const response: HttpResponse = await controller.handle(request_with_invalid_name)

    expect(response.status_code).toBe(400)
    expect(response.body).toBeInstanceOf(InvalidNameError)
  })

  test('should return status code 400 when request contains invalid e-mail', async () => {
    const request_with_invalid_email: HttpRequest = {
      body: {
        name: 'any name',
        email: 'any',
      },
    }

    const response: HttpResponse = await controller.handle(request_with_invalid_email)

    expect(response.status_code).toBe(400)
    expect(response.body).toBeInstanceOf(InvalidEmailError)
  })

  test('should return status code 400 when request is missing user name', async () => {
    const request_with_missing_name: HttpRequest = {
      body: {
        email: 'any',
      },
    }

    const response: HttpResponse = await controller.handle(request_with_missing_name)

    expect(response.status_code).toBe(400)
    expect(response.body).toBeInstanceOf(MissingParamError)
    expect((response.body as Error).message).toBe('Missing parameter from request: name.')
  })

  test('should return status code 400 when request is missing user email', async () => {
    const request_with_missing_email: HttpRequest = {
      body: {
        name: 'any name',
      },
    }

    const response: HttpResponse = await controller.handle(request_with_missing_email)

    expect(response.status_code).toBe(400)
    expect(response.body).toBeInstanceOf(MissingParamError)
    expect((response.body as Error).message).toBe('Missing parameter from request: email.')
  })

  test('should return status code 400 when request is missing user name and email', async () => {
    const request_with_missing_name_and_email: HttpRequest = {
      body: {},
    }

    const response: HttpResponse = await controller.handle(request_with_missing_name_and_email)

    expect(response.status_code).toBe(400)
    expect(response.body).toBeInstanceOf(MissingParamError)
    expect((response.body as Error).message).toBe('Missing parameter from request: name email.')
  })

  test('should return status code 500 when server raises exception', async () => {
    const request: HttpRequest = {
      body: {
        name: 'any name',
        email: 'any@email.com',
      },
    }

    const error_throwing_usecase_stub: ErrorThrowingUseCaseStub = new ErrorThrowingUseCaseStub()
    const controller: RegisterUserController = new RegisterUserController(
      error_throwing_usecase_stub
    )
    const response: HttpResponse = await controller.handle(request)

    expect(response.status_code).toBe(500)
    expect(response.body).toBeInstanceOf(Error)
  })
})
