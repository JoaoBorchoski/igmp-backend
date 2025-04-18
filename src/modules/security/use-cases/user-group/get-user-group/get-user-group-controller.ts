import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { GetUserGroupUseCase } from './get-user-group-use-case'

class GetUserGroupController {
  async handle(request: Request, response: Response): Promise<Response> {
    const id = request.params.id
    const getUserGroupUseCase = container.resolve(GetUserGroupUseCase)
    const userGroup = await getUserGroupUseCase.execute(id)

    return response.status(userGroup.statusCode).json(userGroup.data)
  }
}

export { GetUserGroupController }
