import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { DeleteStatusNegociacaoUseCase } from './delete-status-negociacao-use-case'
import { ListStatusNegociacaoUseCase } from '../list-status-negociacao/list-status-negociacao-use-case'

class DeleteStatusNegociacaoController {
  async handle(request: Request, response: Response): Promise<Response> {
    // delete record
    
    const id = request.params.id
    const deleteStatusNegociacaoUseCase = container.resolve(DeleteStatusNegociacaoUseCase)
    await deleteStatusNegociacaoUseCase.execute(id)


    // restore list with updated records

    const listStatusNegociacaoUseCase = container.resolve(ListStatusNegociacaoUseCase)
    const statusNegociacoes = await listStatusNegociacaoUseCase.execute({
      search: '',
      page: 0,
      rowsPerPage: 100,
      order: ''
    })

    return response.json(statusNegociacoes)
  }
}

export { DeleteStatusNegociacaoController }
