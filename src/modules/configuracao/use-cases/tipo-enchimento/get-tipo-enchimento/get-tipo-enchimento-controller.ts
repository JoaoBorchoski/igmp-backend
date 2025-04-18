import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { GetTipoEnchimentoUseCase } from './get-tipo-enchimento-use-case'

class GetTipoEnchimentoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const id = request.params.id
    const getTipoEnchimentoUseCase = container.resolve(GetTipoEnchimentoUseCase)
    const tipoEnchimento = await getTipoEnchimentoUseCase.execute(id)

    return response.status(tipoEnchimento.statusCode).json(tipoEnchimento.data)
  }
}

export { GetTipoEnchimentoController }
