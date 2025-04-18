import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { SelectProfileOptionUseCase } from './select-profile-option-use-case'

class SelectProfileOptionController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { filter } = request.query

    const selectProfileOptionUseCase = container.resolve(SelectProfileOptionUseCase)

    const profileOptions = await selectProfileOptionUseCase.execute({
      filter: filter as string,
    })

    return response.json(profileOptions)
  }
}

export { SelectProfileOptionController }
