import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateUserProfileUseCase } from './create-user-profile-use-case'
import { HttpResponse } from '@shared/helpers'

class CreateUserProfileController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      userId,
      profileId
    } = request.body

    const createUserProfileUseCase = container.resolve(CreateUserProfileUseCase)

    const result = await createUserProfileUseCase.execute({
        userId,
        profileId
      })
      .then(userProfileResult => {
        return userProfileResult
      })
      .catch(error => {
        return error
      })

    return response.status(result.statusCode).json(result)
  }
}

export { CreateUserProfileController }
