import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateProfileOptionUseCase } from './create-profile-option-use-case'
import { HttpResponse } from '@shared/helpers'

class CreateProfileOptionController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      profileId,
      menuOptionKey,
      permitAll,
      permitCreate,
      permitRestore,
      permitUpdate,
      permitDelete,
      disabled
    } = request.body

    const createProfileOptionUseCase = container.resolve(CreateProfileOptionUseCase)

    const result = await createProfileOptionUseCase.execute({
        profileId,
        menuOptionKey,
        permitAll,
        permitCreate,
        permitRestore,
        permitUpdate,
        permitDelete,
        disabled
      })
      .then(profileOptionResult => {
        return profileOptionResult
      })
      .catch(error => {
        return error
      })

    return response.status(result.statusCode).json(result)
  }
}

export { CreateProfileOptionController }
