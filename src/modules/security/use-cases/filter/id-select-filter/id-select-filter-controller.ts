import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { IdSelectFilterUseCase } from './id-select-filter-use-case'

class IdSelectFilterController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const idSelectFilterUseCase = container.resolve(IdSelectFilterUseCase)

    const filter = await idSelectFilterUseCase.execute({
      id: id as string
    })

    return response.json(filter.data)
  }
}

export { IdSelectFilterController }
