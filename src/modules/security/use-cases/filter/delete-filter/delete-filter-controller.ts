import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { DeleteFilterUseCase } from './delete-filter-use-case'
import { ListFilterUseCase } from '../list-filter/list-filter-use-case'

class DeleteFilterController {
  async handle(request: Request, response: Response): Promise<Response> {
    // delete record
    
    const id = request.params.id
    const deleteFilterUseCase = container.resolve(DeleteFilterUseCase)
    await deleteFilterUseCase.execute(id)


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

export { DeleteFilterController }
