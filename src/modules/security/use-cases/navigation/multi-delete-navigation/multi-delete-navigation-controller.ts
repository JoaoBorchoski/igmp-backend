import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { MultiDeleteNavigationUseCase } from './multi-delete-navigation-use-case'
import { ListNavigationUseCase } from '../list-navigation/list-navigation-use-case'

class MultiDeleteNavigationController {
  async handle(request: Request, response: Response): Promise<Response> {
    // delete multi record

    const ids = request.body
    const multiDeleteNavigationUseCase = container.resolve(MultiDeleteNavigationUseCase)
    await multiDeleteNavigationUseCase.execute(ids)


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

export { MultiDeleteNavigationController }
