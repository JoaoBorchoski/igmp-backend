import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { MultiDeleteAlizarUseCase } from './multi-delete-alizar-use-case'
import { ListAlizarUseCase } from '../list-alizar/list-alizar-use-case'

class MultiDeleteAlizarController {
  async handle(request: Request, response: Response): Promise<Response> {
    // delete multi record

    const ids = request.body
    const multiDeleteAlizarUseCase = container.resolve(MultiDeleteAlizarUseCase)
    await multiDeleteAlizarUseCase.execute(ids)


    // restore list with updated records

    const listAlizarUseCase = container.resolve(ListAlizarUseCase)
    const alizares = await listAlizarUseCase.execute({
      search: '',
      page: 0,
      rowsPerPage: 100,
      order: ''
    })

    return response.json(alizares)
  }
}

export { MultiDeleteAlizarController }
