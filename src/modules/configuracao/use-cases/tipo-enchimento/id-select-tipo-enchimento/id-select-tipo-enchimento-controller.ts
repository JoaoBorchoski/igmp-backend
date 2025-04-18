import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { IdSelectTipoEnchimentoUseCase } from './id-select-tipo-enchimento-use-case'

class IdSelectTipoEnchimentoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const idSelectTipoEnchimentoUseCase = container.resolve(IdSelectTipoEnchimentoUseCase)

    const tipoEnchimento = await idSelectTipoEnchimentoUseCase.execute({
      id: id as string
    })

    return response.json(tipoEnchimento.data)
  }
}

export { IdSelectTipoEnchimentoController }
