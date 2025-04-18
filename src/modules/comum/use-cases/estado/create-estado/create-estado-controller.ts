import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateEstadoUseCase } from './create-estado-use-case'
import { HttpResponse } from '@shared/helpers'

class CreateEstadoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      codigoIbge,
      uf,
      nomeEstado
    } = request.body

    const createEstadoUseCase = container.resolve(CreateEstadoUseCase)

    const result = await createEstadoUseCase.execute({
        codigoIbge,
        uf,
        nomeEstado
      })
      .then(estadoResult => {
        return estadoResult
      })
      .catch(error => {
        return error
      })

    return response.status(result.statusCode).json(result)
  }
}

export { CreateEstadoController }
