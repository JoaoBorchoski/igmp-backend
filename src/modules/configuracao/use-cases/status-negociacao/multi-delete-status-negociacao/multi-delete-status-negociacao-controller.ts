import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { MultiDeleteStatusNegociacaoUseCase } from './multi-delete-status-negociacao-use-case'
import { ListStatusNegociacaoUseCase } from '../list-status-negociacao/list-status-negociacao-use-case'

class MultiDeleteStatusNegociacaoController {
  async handle(request: Request, response: Response): Promise<Response> {
    // delete multi record

    const ids = request.body
    const multiDeleteStatusNegociacaoUseCase = container.resolve(MultiDeleteStatusNegociacaoUseCase)
    await multiDeleteStatusNegociacaoUseCase.execute(ids)


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

export { MultiDeleteStatusNegociacaoController }
