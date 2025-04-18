import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { SelectProfileUseCase } from './select-profile-use-case'

class SelectProfileController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { filter } = request.query

    const selectProfileUseCase = container.resolve(SelectProfileUseCase)

    const profiles = await selectProfileUseCase.execute({
      filter: filter as string,
    })

    return response.json(profiles)
  }
}

export { SelectProfileController }
