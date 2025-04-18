import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { GetFilterUseCase } from './get-filter-use-case'

class GetFilterController {
  async handle(request: Request, response: Response): Promise<Response> {
    const id = request.params.id
    const getFilterUseCase = container.resolve(GetFilterUseCase)
    const filter = await getFilterUseCase.execute(id)

    return response.status(filter.statusCode).json(filter.data)
  }
}

export { GetFilterController }
