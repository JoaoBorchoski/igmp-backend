import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { DeleteMenuOptionUseCase } from './delete-menu-option-use-case'
import { ListMenuOptionUseCase } from '../list-menu-option/list-menu-option-use-case'

class DeleteMenuOptionController {
  async handle(request: Request, response: Response): Promise<Response> {
    // delete record
    
    const id = request.params.id
    const deleteMenuOptionUseCase = container.resolve(DeleteMenuOptionUseCase)
    await deleteMenuOptionUseCase.execute(id)


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

export { DeleteMenuOptionController }
