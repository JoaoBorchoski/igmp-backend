import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { DeleteUserProfileUseCase } from './delete-user-profile-use-case'
import { ListUserProfileUseCase } from '../list-user-profile/list-user-profile-use-case'

class DeleteUserProfileController {
  async handle(request: Request, response: Response): Promise<Response> {
    // delete record
    
    const id = request.params.id
    const deleteUserProfileUseCase = container.resolve(DeleteUserProfileUseCase)
    await deleteUserProfileUseCase.execute(id)


    // restore list with updated records

    const listUserProfileUseCase = container.resolve(ListUserProfileUseCase)
    const usersProfiles = await listUserProfileUseCase.execute({
      search: '',
      page: 0,
      rowsPerPage: 100,
      order: ''
    })

    return response.json(usersProfiles)
  }
}

export { DeleteUserProfileController }
