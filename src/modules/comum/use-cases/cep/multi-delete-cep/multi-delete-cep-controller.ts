import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { MultiDeleteCepUseCase } from './multi-delete-cep-use-case'
import { ListCepUseCase } from '../list-cep/list-cep-use-case'

class MultiDeleteCepController {
  async handle(request: Request, response: Response): Promise<Response> {
    // delete multi record

    const ids = request.body
    const multiDeleteCepUseCase = container.resolve(MultiDeleteCepUseCase)
    await multiDeleteCepUseCase.execute(ids)


    // restore list with updated records

    const listCepUseCase = container.resolve(ListCepUseCase)
    const ceps = await listCepUseCase.execute({
      search: '',
      page: 0,
      rowsPerPage: 100,
      order: ''
    })

    return response.json(ceps)
  }
}

export { MultiDeleteCepController }
