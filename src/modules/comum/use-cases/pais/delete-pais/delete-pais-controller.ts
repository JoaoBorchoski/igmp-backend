import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { DeletePaisUseCase } from './delete-pais-use-case'
import { ListPaisUseCase } from '../list-pais/list-pais-use-case'

class DeletePaisController {
  async handle(request: Request, response: Response): Promise<Response> {
    // delete record
    
    const id = request.params.id
    const deletePaisUseCase = container.resolve(DeletePaisUseCase)
    await deletePaisUseCase.execute(id)


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

export { DeletePaisController }
