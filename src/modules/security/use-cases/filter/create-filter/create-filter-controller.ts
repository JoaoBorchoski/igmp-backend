import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateFilterUseCase } from './create-filter-use-case'
import { HttpResponse } from '@shared/helpers'

class CreateFilterController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      name,
      expression,
      table
    } = request.body

    const user = request.user

    const createFilterUseCase = container.resolve(CreateFilterUseCase)

    const result = await createFilterUseCase.execute({
        name,
        expression,
        table,
        userId: user.id
      })
      .then(filterResult => {
        return filterResult
      })
      .catch(error => {
        return error
      })

    return response.status(result.statusCode).json(result)
  }
}

export { CreateFilterController }
