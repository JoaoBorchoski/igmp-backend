import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { SelectFilterUseCase } from './select-filter-use-case'
import { User } from '@modules/security/infra/typeorm/entities/user'

class SelectFilterController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { table } = request.query
    
    const user = request.user

    const selectFilterUseCase = container.resolve(SelectFilterUseCase)

    const filters = await selectFilterUseCase.execute({
      table: table as string,
      user: user as User
    })

    return response.json(filters)
  }
}

export { SelectFilterController }
