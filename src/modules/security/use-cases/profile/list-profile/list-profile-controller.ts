import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListProfileUseCase } from './list-profile-use-case'

class ListProfileController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search,
      page,
      pageSize,
      order,
      filter
    } = request.body

    const listProfileUseCase = container.resolve(ListProfileUseCase)

    const profiles = await listProfileUseCase.execute({
      search: search as string,
      page: Number(page) as number,
      rowsPerPage: Number(pageSize) as number,
      order: order as string,
      filter: filter as string
    })

    return response.json(profiles)
  }
}

export { ListProfileController }
