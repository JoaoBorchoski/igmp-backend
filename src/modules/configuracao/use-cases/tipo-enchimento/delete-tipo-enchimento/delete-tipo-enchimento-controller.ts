import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { DeleteTipoEnchimentoUseCase } from './delete-tipo-enchimento-use-case'
import { ListTipoEnchimentoUseCase } from '../list-tipo-enchimento/list-tipo-enchimento-use-case'

class DeleteTipoEnchimentoController {
  async handle(request: Request, response: Response): Promise<Response> {
    // delete record
    
    const id = request.params.id
    const deleteTipoEnchimentoUseCase = container.resolve(DeleteTipoEnchimentoUseCase)
    await deleteTipoEnchimentoUseCase.execute(id)


    // restore list with updated records

    const listTipoEnchimentoUseCase = container.resolve(ListTipoEnchimentoUseCase)
    const tiposEnchimento = await listTipoEnchimentoUseCase.execute({
      search: '',
      page: 0,
      rowsPerPage: 100,
      order: ''
    })

    return response.json(tiposEnchimento)
  }
}

export { DeleteTipoEnchimentoController }
