import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { SelectUserGroupUseCase } from './select-user-group-use-case'

class SelectUserGroupController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { filter } = request.query

    const selectUserGroupUseCase = container.resolve(SelectUserGroupUseCase)

    const userGroups = await selectUserGroupUseCase.execute({
      filter: filter as string,
    })

    return response.json(userGroups)
  }
}

export { SelectUserGroupController }
