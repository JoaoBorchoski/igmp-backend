import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { MultiDeleteUserGroupUseCase } from './multi-delete-user-group-use-case'
import { ListUserGroupUseCase } from '../list-user-group/list-user-group-use-case'

class MultiDeleteUserGroupController {
  async handle(request: Request, response: Response): Promise<Response> {
    // delete multi record

    const ids = request.body
    const multiDeleteUserGroupUseCase = container.resolve(MultiDeleteUserGroupUseCase)
    await multiDeleteUserGroupUseCase.execute(ids)


    // restore list with updated records

    const listUserGroupUseCase = container.resolve(ListUserGroupUseCase)
    const userGroups = await listUserGroupUseCase.execute({
      search: '',
      page: 0,
      rowsPerPage: 100,
      order: ''
    })

    return response.json(userGroups)
  }
}

export { MultiDeleteUserGroupController }
