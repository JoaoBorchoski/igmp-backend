import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CountPacoteUseCase } from './count-pacote-use-case'

class CountPacoteController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search
    } = request.body

    const countPacoteUseCase = container.resolve(CountPacoteUseCase)

    const pacotesCount = await countPacoteUseCase.execute({
      search: search as string
    })

    return response.status(pacotesCount.statusCode).json(pacotesCount)
  }
}

export { CountPacoteController }
