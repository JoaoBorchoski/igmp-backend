import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { GetSentidoAberturaUseCase } from './get-sentido-abertura-use-case'

class GetSentidoAberturaController {
  async handle(request: Request, response: Response): Promise<Response> {
    const id = request.params.id
    const getSentidoAberturaUseCase = container.resolve(GetSentidoAberturaUseCase)
    const sentidoAbertura = await getSentidoAberturaUseCase.execute(id)

    return response.status(sentidoAbertura.statusCode).json(sentidoAbertura.data)
  }
}

export { GetSentidoAberturaController }
