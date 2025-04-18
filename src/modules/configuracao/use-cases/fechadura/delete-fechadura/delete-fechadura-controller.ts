import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { DeleteFechaduraUseCase } from './delete-fechadura-use-case'
import { ListFechaduraUseCase } from '../list-fechadura/list-fechadura-use-case'

class DeleteFechaduraController {
  async handle(request: Request, response: Response): Promise<Response> {
    // delete record
    
    const id = request.params.id
    const deleteFechaduraUseCase = container.resolve(DeleteFechaduraUseCase)
    await deleteFechaduraUseCase.execute(id)


    // restore list with updated records

    const listFechaduraUseCase = container.resolve(ListFechaduraUseCase)
    const fechaduras = await listFechaduraUseCase.execute({
      search: '',
      page: 0,
      rowsPerPage: 100,
      order: ''
    })

    return response.json(fechaduras)
  }
}

export { DeleteFechaduraController }
