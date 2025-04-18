import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { DeleteAlturaVaosUseCase } from './delete-altura-vaos-use-case'
import { ListAlturaVaosUseCase } from '../list-altura-vaos/list-altura-vaos-use-case'

class DeleteAlturaVaosController {
  async handle(request: Request, response: Response): Promise<Response> {
    // delete record
    
    const id = request.params.id
    const deleteAlturaVaosUseCase = container.resolve(DeleteAlturaVaosUseCase)
    await deleteAlturaVaosUseCase.execute(id)


    // restore list with updated records

    const listAlturaVaosUseCase = container.resolve(ListAlturaVaosUseCase)
    const alturasVaos = await listAlturaVaosUseCase.execute({
      search: '',
      page: 0,
      rowsPerPage: 100,
      order: ''
    })

    return response.json(alturasVaos)
  }
}

export { DeleteAlturaVaosController }
