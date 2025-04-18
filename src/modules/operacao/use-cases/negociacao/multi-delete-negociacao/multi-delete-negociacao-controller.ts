import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { MultiDeleteNegociacaoUseCase } from './multi-delete-negociacao-use-case'
import { ListNegociacaoUseCase } from '../list-negociacao/list-negociacao-use-case'

class MultiDeleteNegociacaoController {
  async handle(request: Request, response: Response): Promise<Response> {
    // delete multi record

    const ids = request.body
    const multiDeleteNegociacaoUseCase = container.resolve(MultiDeleteNegociacaoUseCase)
    await multiDeleteNegociacaoUseCase.execute(ids)


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

export { MultiDeleteNegociacaoController }
