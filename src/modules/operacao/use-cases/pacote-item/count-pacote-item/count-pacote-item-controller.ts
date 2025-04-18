import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CountPacoteItemUseCase } from './count-pacote-item-use-case'

class CountPacoteItemController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search
    } = request.body

    const countPacoteItemUseCase = container.resolve(CountPacoteItemUseCase)

    const pacotesItemsCount = await countPacoteItemUseCase.execute({
      search: search as string
    })

    return response.status(pacotesItemsCount.statusCode).json(pacotesItemsCount)
  }
}

export { CountPacoteItemController }
