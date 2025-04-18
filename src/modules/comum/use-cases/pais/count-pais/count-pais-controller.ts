import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CountPaisUseCase } from './count-pais-use-case'

class CountPaisController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search
    } = request.body

    const countPaisUseCase = container.resolve(CountPaisUseCase)

    const paisesCount = await countPaisUseCase.execute({
      search: search as string
    })

    return response.status(paisesCount.statusCode).json(paisesCount)
  }
}

export { CountPaisController }
