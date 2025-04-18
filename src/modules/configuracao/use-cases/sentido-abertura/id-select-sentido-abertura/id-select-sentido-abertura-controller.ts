import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { IdSelectSentidoAberturaUseCase } from './id-select-sentido-abertura-use-case'

class IdSelectSentidoAberturaController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const idSelectSentidoAberturaUseCase = container.resolve(IdSelectSentidoAberturaUseCase)

    const sentidoAbertura = await idSelectSentidoAberturaUseCase.execute({
      id: id as string
    })

    return response.json(sentidoAbertura.data)
  }
}

export { IdSelectSentidoAberturaController }
