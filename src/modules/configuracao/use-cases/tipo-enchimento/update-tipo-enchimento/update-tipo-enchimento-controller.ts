import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UpdateTipoEnchimentoUseCase } from './update-tipo-enchimento-use-case'

class UpdateTipoEnchimentoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      nome,
      descricao
    } = request.body

    const { id } = request.params

    const updateTipoEnchimentoUseCase = container.resolve(UpdateTipoEnchimentoUseCase)

    const result = await updateTipoEnchimentoUseCase.execute({
        id,
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

export { UpdateTipoEnchimentoController }
