import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { MultiDeleteTipoEnchimentoUseCase } from './multi-delete-tipo-enchimento-use-case'
import { ListTipoEnchimentoUseCase } from '../list-tipo-enchimento/list-tipo-enchimento-use-case'

class MultiDeleteTipoEnchimentoController {
  async handle(request: Request, response: Response): Promise<Response> {
    // delete multi record

    const ids = request.body
    const multiDeleteTipoEnchimentoUseCase = container.resolve(MultiDeleteTipoEnchimentoUseCase)
    await multiDeleteTipoEnchimentoUseCase.execute(ids)


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

export { MultiDeleteTipoEnchimentoController }
