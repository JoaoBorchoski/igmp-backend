import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { MultiDeleteCidadeUseCase } from './multi-delete-cidade-use-case'
import { ListCidadeUseCase } from '../list-cidade/list-cidade-use-case'

class MultiDeleteCidadeController {
  async handle(request: Request, response: Response): Promise<Response> {
    // delete multi record

    const ids = request.body
    const multiDeleteCidadeUseCase = container.resolve(MultiDeleteCidadeUseCase)
    await multiDeleteCidadeUseCase.execute(ids)


    // restore list with updated records

    const listCidadeUseCase = container.resolve(ListCidadeUseCase)
    const cidades = await listCidadeUseCase.execute({
      search: '',
      page: 0,
      rowsPerPage: 100,
      order: ''
    })

    return response.json(cidades)
  }
}

export { MultiDeleteCidadeController }
