import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CountSentidoAberturaUseCase } from './count-sentido-abertura-use-case'

class CountSentidoAberturaController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search
    } = request.body

    const countSentidoAberturaUseCase = container.resolve(CountSentidoAberturaUseCase)

    const sentidosAberturaCount = await countSentidoAberturaUseCase.execute({
      search: search as string
    })

    return response.status(sentidosAberturaCount.statusCode).json(sentidosAberturaCount)
  }
}

export { CountSentidoAberturaController }
