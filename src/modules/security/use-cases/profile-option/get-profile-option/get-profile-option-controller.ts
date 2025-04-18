import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { GetProfileOptionUseCase } from './get-profile-option-use-case'

class GetProfileOptionController {
  async handle(request: Request, response: Response): Promise<Response> {
    const id = request.params.id
    const getProfileOptionUseCase = container.resolve(GetProfileOptionUseCase)
    const profileOption = await getProfileOptionUseCase.execute(id)

    return response.status(profileOption.statusCode).json(profileOption.data)
  }
}

export { GetProfileOptionController }
