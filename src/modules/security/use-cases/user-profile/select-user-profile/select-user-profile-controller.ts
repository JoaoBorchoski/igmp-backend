import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { SelectUserProfileUseCase } from './select-user-profile-use-case'

class SelectUserProfileController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { filter } = request.query

    const selectUserProfileUseCase = container.resolve(SelectUserProfileUseCase)

    const usersProfiles = await selectUserProfileUseCase.execute({
      filter: filter as string,
    })

    return response.json(usersProfiles)
  }
}

export { SelectUserProfileController }
