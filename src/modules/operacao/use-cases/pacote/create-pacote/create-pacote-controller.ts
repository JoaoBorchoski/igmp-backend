import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreatePacoteUseCase } from './create-pacote-use-case'
import { HttpResponse } from '@shared/helpers'

class CreatePacoteController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      pedidoId,
      descricao
    } = request.body

    const createPacoteUseCase = container.resolve(CreatePacoteUseCase)

    const result = await createPacoteUseCase.execute({
        pedidoId,
        descricao
      })
      .then(pacoteResult => {
        return pacoteResult
      })
      .catch(error => {
        return error
      })

    return response.status(result.statusCode).json(result)
  }
}

export { CreatePacoteController }
