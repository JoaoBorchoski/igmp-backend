import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListMenuOptionUseCase } from './list-menu-option-use-case'

class ListMenuOptionController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search,
      page,
      pageSize,
      order,
      filter
    } = request.body

    const listMenuOptionUseCase = container.resolve(ListMenuOptionUseCase)

    const menuOptions = await listMenuOptionUseCase.execute({
      search: search as string,
      page: Number(page) as number,
      rowsPerPage: Number(pageSize) as number,
      order: order as string,
      filter: filter as string
    })

    return response.json(menuOptions)
  }
}

export { ListMenuOptionController }
