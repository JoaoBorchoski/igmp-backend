import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UpdateUserGroupUseCase } from './update-user-group-use-case'

class UpdateUserGroupController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      name,
      disabled
    } = request.body

    const { id } = request.params

    const updateUserGroupUseCase = container.resolve(UpdateUserGroupUseCase)

    const result = await updateUserGroupUseCase.execute({
        id,
        name,
        disabled
      })
      .then(userGroupResult => {
        return userGroupResult
      })
      .catch(error => {
        return error
      })

    return response.status(result.statusCode).json(result)
  }
}

export { UpdateUserGroupController }
