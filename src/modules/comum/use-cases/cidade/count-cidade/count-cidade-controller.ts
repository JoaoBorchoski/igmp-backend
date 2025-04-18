import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CountCidadeUseCase } from './count-cidade-use-case'

class CountCidadeController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search
    } = request.body

    const countCidadeUseCase = container.resolve(CountCidadeUseCase)

    const cidadesCount = await countCidadeUseCase.execute({
      search: search as string
    })

    return response.status(cidadesCount.statusCode).json(cidadesCount)
  }
}

export { CountCidadeController }
