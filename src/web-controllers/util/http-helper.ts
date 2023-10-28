import { HttpResponse } from '@/web-controllers/ports'

export function created(data: any): HttpResponse {
  return {
    status_code: 201,
    body: data,
  }
}
