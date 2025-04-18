import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CountAlizarUseCase } from './count-alizar-use-case'

class CountAlizarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search
    } = request.body

    const countAlizarUseCase = container.resolve(CountAlizarUseCase)

    const alizaresCount = await countAlizarUseCase.execute({
      search: search as string
    })

    return response.status(alizaresCount.statusCode).json(alizaresCount)
  }
}

export { CountAlizarController }
