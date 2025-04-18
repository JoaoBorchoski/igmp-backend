import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { MultiDeletePaisUseCase } from './multi-delete-pais-use-case'
import { ListPaisUseCase } from '../list-pais/list-pais-use-case'

class MultiDeletePaisController {
  async handle(request: Request, response: Response): Promise<Response> {
    // delete multi record

    const ids = request.body
    const multiDeletePaisUseCase = container.resolve(MultiDeletePaisUseCase)
    await multiDeletePaisUseCase.execute(ids)


    // restore list with updated records

    const listPaisUseCase = container.resolve(ListPaisUseCase)
    const paises = await listPaisUseCase.execute({
      search: '',
      page: 0,
      rowsPerPage: 100,
      order: ''
    })

    return response.json(paises)
  }
}

export { MultiDeletePaisController }
