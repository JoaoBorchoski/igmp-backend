import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { DeleteEstadoUseCase } from './delete-estado-use-case'
import { ListEstadoUseCase } from '../list-estado/list-estado-use-case'

class DeleteEstadoController {
  async handle(request: Request, response: Response): Promise<Response> {
    // delete record
    
    const id = request.params.id
    const deleteEstadoUseCase = container.resolve(DeleteEstadoUseCase)
    await deleteEstadoUseCase.execute(id)


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

export { DeleteEstadoController }
