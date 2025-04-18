import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { MultiDeleteLarguraVaosUseCase } from './multi-delete-largura-vaos-use-case'
import { ListLarguraVaosUseCase } from '../list-largura-vaos/list-largura-vaos-use-case'

class MultiDeleteLarguraVaosController {
  async handle(request: Request, response: Response): Promise<Response> {
    // delete multi record

    const ids = request.body
    const multiDeleteLarguraVaosUseCase = container.resolve(MultiDeleteLarguraVaosUseCase)
    await multiDeleteLarguraVaosUseCase.execute(ids)


    // restore list with updated records

    const listLarguraVaosUseCase = container.resolve(ListLarguraVaosUseCase)
    const largurasVaos = await listLarguraVaosUseCase.execute({
      search: '',
      page: 0,
      rowsPerPage: 100,
      order: ''
    })

    return response.json(largurasVaos)
  }
}

export { MultiDeleteLarguraVaosController }
