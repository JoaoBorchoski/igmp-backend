import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListProfileOptionUseCase } from './list-profile-option-use-case'

class ListProfileOptionController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search,
      page,
      pageSize,
      order,
      filter
    } = request.body

    const listProfileOptionUseCase = container.resolve(ListProfileOptionUseCase)

    const profileOptions = await listProfileOptionUseCase.execute({
      search: search as string,
      page: Number(page) as number,
      rowsPerPage: Number(pageSize) as number,
      order: order as string,
      filter: filter as string
    })

    return response.json(profileOptions)
  }
}

export { ListProfileOptionController }
