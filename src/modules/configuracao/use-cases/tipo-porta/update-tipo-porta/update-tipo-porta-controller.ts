import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UpdateTipoPortaUseCase } from './update-tipo-porta-use-case'

class UpdateTipoPortaController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      nome,
      descricao
    } = request.body

    const { id } = request.params

    const updateTipoPortaUseCase = container.resolve(UpdateTipoPortaUseCase)

    const result = await updateTipoPortaUseCase.execute({
        id,
        nome,
        descricao
      })
      .then(tipoPortaResult => {
        return tipoPortaResult
      })
      .catch(error => {
        return error
      })

    return response.status(result.statusCode).json(result)
  }
}

export { UpdateTipoPortaController }
