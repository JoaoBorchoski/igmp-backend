import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { DeletePacoteItemUseCase } from './delete-pacote-item-use-case'
import { ListPacoteItemUseCase } from '../list-pacote-item/list-pacote-item-use-case'

class DeletePacoteItemController {
  async handle(request: Request, response: Response): Promise<Response> {
    // delete record
    
    const id = request.params.id
    const deletePacoteItemUseCase = container.resolve(DeletePacoteItemUseCase)
    await deletePacoteItemUseCase.execute(id)


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

export { DeletePacoteItemController }
