import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { IdSelectUserGroupUseCase } from './id-select-user-group-use-case'

class IdSelectUserGroupController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const idSelectUserGroupUseCase = container.resolve(IdSelectUserGroupUseCase)

    const userGroup = await idSelectUserGroupUseCase.execute({
      id: id as string
    })

    return response.json(userGroup.data)
  }
}

export { IdSelectUserGroupController }
