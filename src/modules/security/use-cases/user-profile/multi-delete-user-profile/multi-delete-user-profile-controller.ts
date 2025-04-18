import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { MultiDeleteUserProfileUseCase } from './multi-delete-user-profile-use-case'
import { ListUserProfileUseCase } from '../list-user-profile/list-user-profile-use-case'

class MultiDeleteUserProfileController {
  async handle(request: Request, response: Response): Promise<Response> {
    // delete multi record

    const ids = request.body
    const multiDeleteUserProfileUseCase = container.resolve(MultiDeleteUserProfileUseCase)
    await multiDeleteUserProfileUseCase.execute(ids)


    // restore list with updated records

    const listUserProfileUseCase = container.resolve(ListUserProfileUseCase)
    const userProfiles = await listUserProfileUseCase.execute({
      search: '',
      page: 0,
      rowsPerPage: 100,
      order: ''
    })

    return response.json(userProfiles)
  }
}

export { MultiDeleteUserProfileController }
