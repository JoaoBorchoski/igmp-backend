import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { DeleteSentidoAberturaUseCase } from './delete-sentido-abertura-use-case'
import { ListSentidoAberturaUseCase } from '../list-sentido-abertura/list-sentido-abertura-use-case'

class DeleteSentidoAberturaController {
  async handle(request: Request, response: Response): Promise<Response> {
    // delete record
    
    const id = request.params.id
    const deleteSentidoAberturaUseCase = container.resolve(DeleteSentidoAberturaUseCase)
    await deleteSentidoAberturaUseCase.execute(id)


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

export { DeleteSentidoAberturaController }
