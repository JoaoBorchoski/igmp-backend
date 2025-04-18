import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { DeletePacoteUseCase } from './delete-pacote-use-case'
import { ListPacoteUseCase } from '../list-pacote/list-pacote-use-case'

class DeletePacoteController {
  async handle(request: Request, response: Response): Promise<Response> {
    // delete record
    
    const id = request.params.id
    const deletePacoteUseCase = container.resolve(DeletePacoteUseCase)
    await deletePacoteUseCase.execute(id)


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

export { DeletePacoteController }
