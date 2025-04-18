import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CountPadraoCorUseCase } from './count-padrao-cor-use-case'

class CountPadraoCorController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search
    } = request.body

    const countPadraoCorUseCase = container.resolve(CountPadraoCorUseCase)

    const padroesCoresCount = await countPadraoCorUseCase.execute({
      search: search as string
    })

    return response.status(padroesCoresCount.statusCode).json(padroesCoresCount)
  }
}

export { CountPadraoCorController }
