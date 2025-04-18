import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CountCepUseCase } from './count-cep-use-case'

class CountCepController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search
    } = request.body

    const countCepUseCase = container.resolve(CountCepUseCase)

    const cepsCount = await countCepUseCase.execute({
      search: search as string
    })

    return response.status(cepsCount.statusCode).json(cepsCount)
  }
}

export { CountCepController }
