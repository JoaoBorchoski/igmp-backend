import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListUserGroupUseCase } from './list-user-group-use-case'

class ListUserGroupController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search,
      page,
      pageSize,
      order,
      filter
    } = request.body

    const listUserGroupUseCase = container.resolve(ListUserGroupUseCase)

    const userGroups = await listUserGroupUseCase.execute({
      search: search as string,
      page: Number(page) as number,
      rowsPerPage: Number(pageSize) as number,
      order: order as string,
      filter: filter as string
    })

    return response.json(userGroups)
  }
}

export { ListUserGroupController }
