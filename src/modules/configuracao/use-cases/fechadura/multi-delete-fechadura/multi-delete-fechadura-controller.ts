import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { MultiDeleteFechaduraUseCase } from './multi-delete-fechadura-use-case'
import { ListFechaduraUseCase } from '../list-fechadura/list-fechadura-use-case'

class MultiDeleteFechaduraController {
  async handle(request: Request, response: Response): Promise<Response> {
    // delete multi record

    const ids = request.body
    const multiDeleteFechaduraUseCase = container.resolve(MultiDeleteFechaduraUseCase)
    await multiDeleteFechaduraUseCase.execute(ids)


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

export { MultiDeleteFechaduraController }
