import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { SelectPacoteItemUseCase } from './select-pacote-item-use-case'

class SelectPacoteItemController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { filter } = request.query

    const selectPacoteItemUseCase = container.resolve(SelectPacoteItemUseCase)

    const pacotesItems = await selectPacoteItemUseCase.execute({
      filter: filter as string,
    })

    return response.json(pacotesItems)
  }
}

export { SelectPacoteItemController }
