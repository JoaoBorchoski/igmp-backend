import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { MultiDeleteMenuOptionUseCase } from './multi-delete-menu-option-use-case'
import { ListMenuOptionUseCase } from '../list-menu-option/list-menu-option-use-case'

class MultiDeleteMenuOptionController {
  async handle(request: Request, response: Response): Promise<Response> {
    // delete multi record

    const ids = request.body
    const multiDeleteMenuOptionUseCase = container.resolve(MultiDeleteMenuOptionUseCase)
    await multiDeleteMenuOptionUseCase.execute(ids)


    // restore list with updated records

    const listMenuOptionUseCase = container.resolve(ListMenuOptionUseCase)
    const menuOptions = await listMenuOptionUseCase.execute({
      search: '',
      page: 0,
      rowsPerPage: 100,
      order: ''
    })

    return response.json(menuOptions)
  }
}

export { MultiDeleteMenuOptionController }
