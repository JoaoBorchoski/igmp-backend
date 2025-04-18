import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { DeleteNavigationUseCase } from './delete-navigation-use-case'
import { ListNavigationUseCase } from '../list-navigation/list-navigation-use-case'

class DeleteNavigationController {
  async handle(request: Request, response: Response): Promise<Response> {
    // delete record
    
    const id = request.params.id
    const deleteNavigationUseCase = container.resolve(DeleteNavigationUseCase)
    await deleteNavigationUseCase.execute(id)


    // restore list with updated records

    const listNavigationUseCase = container.resolve(ListNavigationUseCase)
    const navigations = await listNavigationUseCase.execute({
      search: '',
      page: 0,
      rowsPerPage: 100,
      order: ''
    })

    return response.json(navigations)
  }
}

export { DeleteNavigationController }
