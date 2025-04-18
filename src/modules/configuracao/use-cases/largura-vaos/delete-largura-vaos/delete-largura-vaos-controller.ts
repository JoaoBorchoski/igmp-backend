import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { DeleteLarguraVaosUseCase } from './delete-largura-vaos-use-case'
import { ListLarguraVaosUseCase } from '../list-largura-vaos/list-largura-vaos-use-case'

class DeleteLarguraVaosController {
  async handle(request: Request, response: Response): Promise<Response> {
    // delete record
    
    const id = request.params.id
    const deleteLarguraVaosUseCase = container.resolve(DeleteLarguraVaosUseCase)
    await deleteLarguraVaosUseCase.execute(id)


    // restore list with updated records

    const listLarguraVaosUseCase = container.resolve(ListLarguraVaosUseCase)
    const largurasVaos = await listLarguraVaosUseCase.execute({
      search: '',
      page: 0,
      rowsPerPage: 100,
      order: ''
    })

    return response.json(largurasVaos)
  }
}

export { DeleteLarguraVaosController }
