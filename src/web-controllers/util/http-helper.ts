import { HttpResponse } from '@/web-controllers/ports'

export function created(data: any): HttpResponse {
  return {
    status_code: 201,
    body: data,
  }
}

export function badRequest(data: any): HttpResponse {
  return {
    status_code: 400,
    body: data,
  }
}

export function serverError(error: any): HttpResponse {
  return {
    status_code: 500,
    body: error,
  }
}
