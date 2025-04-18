import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { DeleteMedicaoUseCase } from './delete-medicao-use-case'
import { ListMedicaoUseCase } from '../list-medicao/list-medicao-use-case'

class DeleteMedicaoController {
  async handle(request: Request, response: Response): Promise<Response> {
    // delete record
    
    const id = request.params.id
    const deleteMedicaoUseCase = container.resolve(DeleteMedicaoUseCase)
    await deleteMedicaoUseCase.execute(id)


    // restore list with updated records

    const listMedicaoUseCase = container.resolve(ListMedicaoUseCase)
    const medicoes = await listMedicaoUseCase.execute({
      search: '',
      page: 0,
      rowsPerPage: 100,
      order: ''
    })

    return response.json(medicoes)
  }
}

export { DeleteMedicaoController }
