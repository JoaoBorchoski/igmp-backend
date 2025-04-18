import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { MultiDeletePadraoCorUseCase } from './multi-delete-padrao-cor-use-case'
import { ListPadraoCorUseCase } from '../list-padrao-cor/list-padrao-cor-use-case'

class MultiDeletePadraoCorController {
  async handle(request: Request, response: Response): Promise<Response> {
    // delete multi record

    const ids = request.body
    const multiDeletePadraoCorUseCase = container.resolve(MultiDeletePadraoCorUseCase)
    await multiDeletePadraoCorUseCase.execute(ids)


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

export { MultiDeletePadraoCorController }
