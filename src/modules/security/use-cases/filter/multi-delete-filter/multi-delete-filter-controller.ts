import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { MultiDeleteFilterUseCase } from './multi-delete-filter-use-case'
import { ListFilterUseCase } from '../list-filter/list-filter-use-case'

class MultiDeleteFilterController {
  async handle(request: Request, response: Response): Promise<Response> {
    // delete multi record

    const ids = request.body
    const multiDeleteFilterUseCase = container.resolve(MultiDeleteFilterUseCase)
    await multiDeleteFilterUseCase.execute(ids)


    // restore list with updated records

    const listFilterUseCase = container.resolve(ListFilterUseCase)
    const filters = await listFilterUseCase.execute({
      search: '',
      page: 0,
      rowsPerPage: 100,
      order: ''
    })

    return response.json(filters)
  }
}

export { MultiDeleteFilterController }
