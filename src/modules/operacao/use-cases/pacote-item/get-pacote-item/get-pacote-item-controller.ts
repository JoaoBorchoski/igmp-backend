import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { GetPacoteItemUseCase } from './get-pacote-item-use-case'

class GetPacoteItemController {
  async handle(request: Request, response: Response): Promise<Response> {
    const id = request.params.id
    const getPacoteItemUseCase = container.resolve(GetPacoteItemUseCase)
    const pacoteItem = await getPacoteItemUseCase.execute(id)

    return response.status(pacoteItem.statusCode).json(pacoteItem.data)
  }
}

export { GetPacoteItemController }
