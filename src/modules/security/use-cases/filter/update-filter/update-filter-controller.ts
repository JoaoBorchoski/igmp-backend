import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UpdateFilterUseCase } from './update-filter-use-case'

class UpdateFilterController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      name,
      expression,
      table,
      userId
    } = request.body

    const { id } = request.params

    const updateFilterUseCase = container.resolve(UpdateFilterUseCase)

    const result = await updateFilterUseCase.execute({
        id,
        name,
        expression,
        table,
        userId
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

export { UpdateFilterController }
