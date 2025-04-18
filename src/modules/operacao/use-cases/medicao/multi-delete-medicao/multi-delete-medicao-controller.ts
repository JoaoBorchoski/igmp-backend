import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { MultiDeleteMedicaoUseCase } from './multi-delete-medicao-use-case'
import { ListMedicaoUseCase } from '../list-medicao/list-medicao-use-case'

class MultiDeleteMedicaoController {
  async handle(request: Request, response: Response): Promise<Response> {
    // delete multi record

    const ids = request.body
    const multiDeleteMedicaoUseCase = container.resolve(MultiDeleteMedicaoUseCase)
    await multiDeleteMedicaoUseCase.execute(ids)


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

export { MultiDeleteMedicaoController }
