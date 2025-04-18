import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { IdSelectPacoteItemUseCase } from './id-select-pacote-item-use-case'

class IdSelectPacoteItemController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const idSelectPacoteItemUseCase = container.resolve(IdSelectPacoteItemUseCase)

    const pacoteItem = await idSelectPacoteItemUseCase.execute({
      id: id as string
    })

    return response.json(pacoteItem.data)
  }
}

export { IdSelectPacoteItemController }
