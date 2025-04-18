import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListUserProfileUseCase } from './list-user-profile-use-case'

class ListUserProfileController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search,
      page,
      pageSize,
      order,
      filter
    } = request.body

    const listUserProfileUseCase = container.resolve(ListUserProfileUseCase)

    const usersProfiles = await listUserProfileUseCase.execute({
      search: search as string,
      page: Number(page) as number,
      rowsPerPage: Number(pageSize) as number,
      order: order as string,
      filter: filter as string
    })

    return response.json(usersProfiles)
  }
}

export { ListUserProfileController }
