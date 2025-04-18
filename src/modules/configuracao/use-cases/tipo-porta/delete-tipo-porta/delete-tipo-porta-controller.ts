import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { DeleteTipoPortaUseCase } from './delete-tipo-porta-use-case'
import { ListTipoPortaUseCase } from '../list-tipo-porta/list-tipo-porta-use-case'

class DeleteTipoPortaController {
  async handle(request: Request, response: Response): Promise<Response> {
    // delete record
    
    const id = request.params.id
    const deleteTipoPortaUseCase = container.resolve(DeleteTipoPortaUseCase)
    await deleteTipoPortaUseCase.execute(id)


    // restore list with updated records

    const listTipoPortaUseCase = container.resolve(ListTipoPortaUseCase)
    const tiposPorta = await listTipoPortaUseCase.execute({
      search: '',
      page: 0,
      rowsPerPage: 100,
      order: ''
    })

    return response.json(tiposPorta)
  }
}

export { DeleteTipoPortaController }
