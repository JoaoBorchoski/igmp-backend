import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CountUserProfileUseCase } from './count-user-profile-use-case'

class CountUserProfileController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search
    } = request.body

    const countUserProfileUseCase = container.resolve(CountUserProfileUseCase)

    const usersProfilesCount = await countUserProfileUseCase.execute({
      search: search as string
    })

    return response.status(usersProfilesCount.statusCode).json(usersProfilesCount)
  }
}

export { CountUserProfileController }
