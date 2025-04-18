import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { MultiDeleteSentidoAberturaUseCase } from './multi-delete-sentido-abertura-use-case'
import { ListSentidoAberturaUseCase } from '../list-sentido-abertura/list-sentido-abertura-use-case'

class MultiDeleteSentidoAberturaController {
  async handle(request: Request, response: Response): Promise<Response> {
    // delete multi record

    const ids = request.body
    const multiDeleteSentidoAberturaUseCase = container.resolve(MultiDeleteSentidoAberturaUseCase)
    await multiDeleteSentidoAberturaUseCase.execute(ids)


    // restore list with updated records

    const listSentidoAberturaUseCase = container.resolve(ListSentidoAberturaUseCase)
    const sentidosAbertura = await listSentidoAberturaUseCase.execute({
      search: '',
      page: 0,
      rowsPerPage: 100,
      order: ''
    })

    return response.json(sentidosAbertura)
  }
}

export { MultiDeleteSentidoAberturaController }
