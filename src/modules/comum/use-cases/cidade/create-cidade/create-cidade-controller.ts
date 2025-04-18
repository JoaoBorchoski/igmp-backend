import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateCidadeUseCase } from './create-cidade-use-case'
import { HttpResponse } from '@shared/helpers'

class CreateCidadeController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      estadoId,
      codigoIbge,
      nomeCidade
    } = request.body

    const createCidadeUseCase = container.resolve(CreateCidadeUseCase)

    const result = await createCidadeUseCase.execute({
        estadoId,
        codigoIbge,
        nomeCidade
      })
      .then(cidadeResult => {
        return cidadeResult
      })
      .catch(error => {
        return error
      })

    return response.status(result.statusCode).json(result)
  }
}

export { CreateCidadeController }
