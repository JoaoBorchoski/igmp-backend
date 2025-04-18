import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateTipoPortaUseCase } from './create-tipo-porta-use-case'
import { HttpResponse } from '@shared/helpers'

class CreateTipoPortaController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      nome,
      descricao
    } = request.body

    const createTipoPortaUseCase = container.resolve(CreateTipoPortaUseCase)

    const result = await createTipoPortaUseCase.execute({
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

export { CreateTipoPortaController }
