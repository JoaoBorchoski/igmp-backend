import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { MultiDeleteAlturaVaosUseCase } from './multi-delete-altura-vaos-use-case'
import { ListAlturaVaosUseCase } from '../list-altura-vaos/list-altura-vaos-use-case'

class MultiDeleteAlturaVaosController {
  async handle(request: Request, response: Response): Promise<Response> {
    // delete multi record

    const ids = request.body
    const multiDeleteAlturaVaosUseCase = container.resolve(MultiDeleteAlturaVaosUseCase)
    await multiDeleteAlturaVaosUseCase.execute(ids)


    // restore list with updated records

    const listAlturaVaosUseCase = container.resolve(ListAlturaVaosUseCase)
    const alturasVaos = await listAlturaVaosUseCase.execute({
      search: '',
      page: 0,
      rowsPerPage: 100,
      order: ''
    })

    return response.json(alturasVaos)
  }
}

export { MultiDeleteAlturaVaosController }
