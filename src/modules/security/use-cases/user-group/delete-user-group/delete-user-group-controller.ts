import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { DeleteUserGroupUseCase } from './delete-user-group-use-case'
import { ListUserGroupUseCase } from '../list-user-group/list-user-group-use-case'

class DeleteUserGroupController {
  async handle(request: Request, response: Response): Promise<Response> {
    // delete record
    
    const id = request.params.id
    const deleteUserGroupUseCase = container.resolve(DeleteUserGroupUseCase)
    await deleteUserGroupUseCase.execute(id)


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

export { DeleteUserGroupController }
