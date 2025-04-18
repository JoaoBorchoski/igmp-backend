import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateUserGroupUseCase } from './create-user-group-use-case'
import { HttpResponse } from '@shared/helpers'

class CreateUserGroupController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      name,
      disabled
    } = request.body

    const createUserGroupUseCase = container.resolve(CreateUserGroupUseCase)

    const result = await createUserGroupUseCase.execute({
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

export { CreateUserGroupController }
