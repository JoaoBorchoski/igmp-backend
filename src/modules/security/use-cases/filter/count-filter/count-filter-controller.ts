import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CountFilterUseCase } from './count-filter-use-case'

class CountFilterController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search
    } = request.body

    const countFilterUseCase = container.resolve(CountFilterUseCase)

    const filtersCount = await countFilterUseCase.execute({
      search: search as string
    })

    return response.status(filtersCount.statusCode).json(filtersCount)
  }
}

export { CountFilterController }
