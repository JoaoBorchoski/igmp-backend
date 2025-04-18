import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateSentidoAberturaUseCase } from './create-sentido-abertura-use-case'
import { HttpResponse } from '@shared/helpers'

class CreateSentidoAberturaController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      nome,
      descricao
    } = request.body

    const createSentidoAberturaUseCase = container.resolve(CreateSentidoAberturaUseCase)

    const result = await createSentidoAberturaUseCase.execute({
        nome,
        descricao
      })
      .then(sentidoAberturaResult => {
        return sentidoAberturaResult
      })
      .catch(error => {
        return error
      })

    return response.status(result.statusCode).json(result)
  }
}

export { CreateSentidoAberturaController }
