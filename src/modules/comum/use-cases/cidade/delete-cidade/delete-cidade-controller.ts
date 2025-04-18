import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { DeleteCidadeUseCase } from './delete-cidade-use-case'
import { ListCidadeUseCase } from '../list-cidade/list-cidade-use-case'

class DeleteCidadeController {
  async handle(request: Request, response: Response): Promise<Response> {
    // delete record
    
    const id = request.params.id
    const deleteCidadeUseCase = container.resolve(DeleteCidadeUseCase)
    await deleteCidadeUseCase.execute(id)


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

export { DeleteCidadeController }
