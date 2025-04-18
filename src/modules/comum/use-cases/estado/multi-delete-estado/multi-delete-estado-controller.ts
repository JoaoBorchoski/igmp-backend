import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { MultiDeleteEstadoUseCase } from './multi-delete-estado-use-case'
import { ListEstadoUseCase } from '../list-estado/list-estado-use-case'

class MultiDeleteEstadoController {
  async handle(request: Request, response: Response): Promise<Response> {
    // delete multi record

    const ids = request.body
    const multiDeleteEstadoUseCase = container.resolve(MultiDeleteEstadoUseCase)
    await multiDeleteEstadoUseCase.execute(ids)


    // restore list with updated records

    const listEstadoUseCase = container.resolve(ListEstadoUseCase)
    const estados = await listEstadoUseCase.execute({
      search: '',
      page: 0,
      rowsPerPage: 100,
      order: ''
    })

    return response.json(estados)
  }
}

export { MultiDeleteEstadoController }
