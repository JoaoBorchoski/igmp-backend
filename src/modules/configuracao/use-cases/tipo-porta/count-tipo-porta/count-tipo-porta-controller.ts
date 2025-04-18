import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CountTipoPortaUseCase } from './count-tipo-porta-use-case'

class CountTipoPortaController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search
    } = request.body

    const countTipoPortaUseCase = container.resolve(CountTipoPortaUseCase)

    const tiposPortaCount = await countTipoPortaUseCase.execute({
      search: search as string
    })

    return response.status(tiposPortaCount.statusCode).json(tiposPortaCount)
  }
}

export { CountTipoPortaController }
