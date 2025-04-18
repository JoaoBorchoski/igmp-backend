import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { IdSelectProfileUseCase } from './id-select-profile-use-case'

class IdSelectProfileController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const idSelectProfileUseCase = container.resolve(IdSelectProfileUseCase)

    const profile = await idSelectProfileUseCase.execute({
      id: id as string
    })

    return response.json(profile.data)
  }
}

export { IdSelectProfileController }
