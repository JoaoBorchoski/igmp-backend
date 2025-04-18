import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UpdateProfileOptionUseCase } from './update-profile-option-use-case'

class UpdateProfileOptionController {
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

    const { id } = request.params

    const updateProfileOptionUseCase = container.resolve(UpdateProfileOptionUseCase)

    const result = await updateProfileOptionUseCase.execute({
        id,
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

export { UpdateProfileOptionController }
