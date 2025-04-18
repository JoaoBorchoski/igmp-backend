import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { MultiDeleteTipoPortaUseCase } from './multi-delete-tipo-porta-use-case'
import { ListTipoPortaUseCase } from '../list-tipo-porta/list-tipo-porta-use-case'

class MultiDeleteTipoPortaController {
  async handle(request: Request, response: Response): Promise<Response> {
    // delete multi record

    const ids = request.body
    const multiDeleteTipoPortaUseCase = container.resolve(MultiDeleteTipoPortaUseCase)
    await multiDeleteTipoPortaUseCase.execute(ids)


    // restore list with updated records

    const listTipoPortaUseCase = container.resolve(ListTipoPortaUseCase)
    const tiposPorta = await listTipoPortaUseCase.execute({
      search: '',
      page: 0,
      rowsPerPage: 100,
      order: ''
    })

    return response.json(tiposPorta)
  }
}

export { MultiDeleteTipoPortaController }
