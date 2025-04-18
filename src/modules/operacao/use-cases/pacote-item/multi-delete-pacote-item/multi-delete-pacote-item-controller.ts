import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { MultiDeletePacoteItemUseCase } from './multi-delete-pacote-item-use-case'
import { ListPacoteItemUseCase } from '../list-pacote-item/list-pacote-item-use-case'

class MultiDeletePacoteItemController {
  async handle(request: Request, response: Response): Promise<Response> {
    // delete multi record

    const ids = request.body
    const multiDeletePacoteItemUseCase = container.resolve(MultiDeletePacoteItemUseCase)
    await multiDeletePacoteItemUseCase.execute(ids)


    // restore list with updated records

    const listPacoteItemUseCase = container.resolve(ListPacoteItemUseCase)
    const pacotesItems = await listPacoteItemUseCase.execute({
      search: '',
      page: 0,
      rowsPerPage: 100,
      order: ''
    })

    return response.json(pacotesItems)
  }
}

export { MultiDeletePacoteItemController }
