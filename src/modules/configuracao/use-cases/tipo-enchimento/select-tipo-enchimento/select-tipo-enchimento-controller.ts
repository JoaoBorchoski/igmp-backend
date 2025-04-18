import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { SelectTipoEnchimentoUseCase } from './select-tipo-enchimento-use-case'

class SelectTipoEnchimentoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { filter } = request.query

    const selectTipoEnchimentoUseCase = container.resolve(SelectTipoEnchimentoUseCase)

    const tiposEnchimento = await selectTipoEnchimentoUseCase.execute({
      filter: filter as string,
    })

    return response.json(tiposEnchimento)
  }
}

export { SelectTipoEnchimentoController }
