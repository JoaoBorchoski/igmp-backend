import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { DeletePadraoCorUseCase } from './delete-padrao-cor-use-case'
import { ListPadraoCorUseCase } from '../list-padrao-cor/list-padrao-cor-use-case'

class DeletePadraoCorController {
  async handle(request: Request, response: Response): Promise<Response> {
    // delete record
    
    const id = request.params.id
    const deletePadraoCorUseCase = container.resolve(DeletePadraoCorUseCase)
    await deletePadraoCorUseCase.execute(id)


    // restore list with updated records

    const listPadraoCorUseCase = container.resolve(ListPadraoCorUseCase)
    const padroesCores = await listPadraoCorUseCase.execute({
      search: '',
      page: 0,
      rowsPerPage: 100,
      order: ''
    })

    return response.json(padroesCores)
  }
}

export { DeletePadraoCorController }
