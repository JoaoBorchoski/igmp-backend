import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateProfileUseCase } from './create-profile-use-case'

class CreateProfileController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      userGroupId,
      name,
      disabled,
      menuOptions
    } = request.body

    const createProfileUseCase = container.resolve(CreateProfileUseCase)

    const result = await createProfileUseCase.execute({
        userGroupId,
        name,
        disabled,
        menuOptions
      })
      .then(profileResult => {
        return profileResult
      })
      .catch(error => {
        return error
      })

    return response.status(result.statusCode).json(result)
  }
}

export { CreateProfileController }
