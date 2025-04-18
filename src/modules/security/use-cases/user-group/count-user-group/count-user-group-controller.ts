import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CountUserGroupUseCase } from './count-user-group-use-case'

class CountUserGroupController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search
    } = request.body

    const countUserGroupUseCase = container.resolve(CountUserGroupUseCase)

    const userGroupsCount = await countUserGroupUseCase.execute({
      search: search as string
    })

    return response.status(userGroupsCount.statusCode).json(userGroupsCount)
  }
}

export { CountUserGroupController }
