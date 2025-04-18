import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { DeleteAlizarUseCase } from './delete-alizar-use-case'
import { ListAlizarUseCase } from '../list-alizar/list-alizar-use-case'

class DeleteAlizarController {
  async handle(request: Request, response: Response): Promise<Response> {
    // delete record
    
    const id = request.params.id
    const deleteAlizarUseCase = container.resolve(DeleteAlizarUseCase)
    await deleteAlizarUseCase.execute(id)


    // restore list with updated records

    const listAlizarUseCase = container.resolve(ListAlizarUseCase)
    const alizares = await listAlizarUseCase.execute({
      search: '',
      page: 0,
      rowsPerPage: 100,
      order: ''
    })

    return response.json(alizares)
  }
}

export { DeleteAlizarController }
