import { ArgumentsHost, Catch, type ExceptionFilter } from '@nestjs/common'
import { ZodError } from 'zod'

@Catch(ZodError)
export class ZodFilter implements ExceptionFilter {
  catch(exception: ZodError, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse()

    const errors = exception.errors.map((error) => {
          return {
            [error.path.join('')]: error.message
          }
        }).reduce((obj, item) => {
          obj = Object.assign(obj, item)
          return obj
        }, {})

    return response.status(422).json({
      statusCode: 422,
      errors
    })
  }
}
