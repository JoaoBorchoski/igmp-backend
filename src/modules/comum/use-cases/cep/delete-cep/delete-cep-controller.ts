import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { DeleteCepUseCase } from './delete-cep-use-case'
import { ListCepUseCase } from '../list-cep/list-cep-use-case'

class DeleteCepController {
  async handle(request: Request, response: Response): Promise<Response> {
    // delete record
    
    const id = request.params.id
    const deleteCepUseCase = container.resolve(DeleteCepUseCase)
    await deleteCepUseCase.execute(id)


    // restore list with updated records

    const listCepUseCase = container.resolve(ListCepUseCase)
    const ceps = await listCepUseCase.execute({
      search: '',
      page: 0,
      rowsPerPage: 100,
      order: ''
    })

    return response.json(ceps)
  }
}

export { DeleteCepController }
