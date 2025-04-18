import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { DeleteClienteUseCase } from './delete-cliente-use-case'
import { ListClienteUseCase } from '../list-cliente/list-cliente-use-case'

class DeleteClienteController {
  async handle(request: Request, response: Response): Promise<Response> {
    // delete record
    
    const id = request.params.id
    const deleteClienteUseCase = container.resolve(DeleteClienteUseCase)
    await deleteClienteUseCase.execute(id)


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

export { DeleteClienteController }
