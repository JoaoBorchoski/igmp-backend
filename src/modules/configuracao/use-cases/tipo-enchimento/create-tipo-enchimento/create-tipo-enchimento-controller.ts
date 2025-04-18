import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateTipoEnchimentoUseCase } from './create-tipo-enchimento-use-case'
import { HttpResponse } from '@shared/helpers'

class CreateTipoEnchimentoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      nome,
      descricao
    } = request.body

    const createTipoEnchimentoUseCase = container.resolve(CreateTipoEnchimentoUseCase)

    const result = await createTipoEnchimentoUseCase.execute({
        nome,
        descricao
      })
      .then(tipoEnchimentoResult => {
        return tipoEnchimentoResult
      })
      .catch(error => {
        return error
      })

    return response.status(result.statusCode).json(result)
  }
}

export { CreateTipoEnchimentoController }
