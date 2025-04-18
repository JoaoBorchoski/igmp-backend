import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { DeleteNegociacaoUseCase } from './delete-negociacao-use-case'
import { ListNegociacaoUseCase } from '../list-negociacao/list-negociacao-use-case'

class DeleteNegociacaoController {
  async handle(request: Request, response: Response): Promise<Response> {
    // delete record
    
    const id = request.params.id
    const deleteNegociacaoUseCase = container.resolve(DeleteNegociacaoUseCase)
    await deleteNegociacaoUseCase.execute(id)


    // restore list with updated records

    const listNegociacaoUseCase = container.resolve(ListNegociacaoUseCase)
    const negociacoes = await listNegociacaoUseCase.execute({
      search: '',
      page: 0,
      rowsPerPage: 100,
      order: ''
    })

    return response.json(negociacoes)
  }
}

export { DeleteNegociacaoController }
