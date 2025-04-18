import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { MultiDeleteClienteUseCase } from './multi-delete-cliente-use-case'
import { ListClienteUseCase } from '../list-cliente/list-cliente-use-case'

class MultiDeleteClienteController {
  async handle(request: Request, response: Response): Promise<Response> {
    // delete multi record

    const ids = request.body
    const multiDeleteClienteUseCase = container.resolve(MultiDeleteClienteUseCase)
    await multiDeleteClienteUseCase.execute(ids)


    // restore list with updated records

    const listClienteUseCase = container.resolve(ListClienteUseCase)
    const clientes = await listClienteUseCase.execute({
      search: '',
      page: 0,
      rowsPerPage: 100,
      order: ''
    })

    return response.json(clientes)
  }
}

export { MultiDeleteClienteController }
