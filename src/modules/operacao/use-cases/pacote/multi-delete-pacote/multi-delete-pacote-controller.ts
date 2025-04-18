import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { MultiDeletePacoteUseCase } from './multi-delete-pacote-use-case'
import { ListPacoteUseCase } from '../list-pacote/list-pacote-use-case'

class MultiDeletePacoteController {
  async handle(request: Request, response: Response): Promise<Response> {
    // delete multi record

    const ids = request.body
    const multiDeletePacoteUseCase = container.resolve(MultiDeletePacoteUseCase)
    await multiDeletePacoteUseCase.execute(ids)


    // restore list with updated records

    const listPacoteUseCase = container.resolve(ListPacoteUseCase)
    const pacotes = await listPacoteUseCase.execute({
      search: '',
      page: 0,
      rowsPerPage: 100,
      order: ''
    })

    return response.json(pacotes)
  }
}

export { MultiDeletePacoteController }
