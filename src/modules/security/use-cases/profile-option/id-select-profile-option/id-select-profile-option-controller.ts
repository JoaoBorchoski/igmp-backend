import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { IdSelectProfileOptionUseCase } from './id-select-profile-option-use-case'

class IdSelectProfileOptionController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const idSelectProfileOptionUseCase = container.resolve(IdSelectProfileOptionUseCase)

    const profileOption = await idSelectProfileOptionUseCase.execute({
      id: id as string
    })

    return response.json(profileOption.data)
  }
}

export { IdSelectProfileOptionController }
