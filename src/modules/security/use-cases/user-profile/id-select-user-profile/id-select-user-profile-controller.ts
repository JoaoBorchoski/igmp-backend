import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { IdSelectUserProfileUseCase } from './id-select-user-profile-use-case'

class IdSelectUserProfileController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const idSelectUserProfileUseCase = container.resolve(IdSelectUserProfileUseCase)

    const userProfile = await idSelectUserProfileUseCase.execute({
      id: id as string
    })

    return response.json(userProfile.data)
  }
}

export { IdSelectUserProfileController }
