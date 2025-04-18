import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CountLarguraVaosUseCase } from './count-largura-vaos-use-case'

class CountLarguraVaosController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search
    } = request.body

    const countLarguraVaosUseCase = container.resolve(CountLarguraVaosUseCase)

    const largurasVaosCount = await countLarguraVaosUseCase.execute({
      search: search as string
    })

    return response.status(largurasVaosCount.statusCode).json(largurasVaosCount)
  }
}

export { CountLarguraVaosController }
