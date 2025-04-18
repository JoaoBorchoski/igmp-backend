import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { SelectSentidoAberturaUseCase } from './select-sentido-abertura-use-case'

class SelectSentidoAberturaController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { filter } = request.query

    const selectSentidoAberturaUseCase = container.resolve(SelectSentidoAberturaUseCase)

    const sentidosAbertura = await selectSentidoAberturaUseCase.execute({
      filter: filter as string,
    })

    return response.json(sentidosAbertura)
  }
}

export { SelectSentidoAberturaController }
