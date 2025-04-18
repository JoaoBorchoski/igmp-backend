import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UpdateUserProfileUseCase } from './update-user-profile-use-case'

class UpdateUserProfileController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      userId,
      profileId
    } = request.body

    const { id } = request.params

    const updateUserProfileUseCase = container.resolve(UpdateUserProfileUseCase)

    const result = await updateUserProfileUseCase.execute({
        id,
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

export { UpdateUserProfileController }
