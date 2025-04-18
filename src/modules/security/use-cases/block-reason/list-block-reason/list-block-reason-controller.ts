import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListBlockReasonUseCase } from './list-block-reason-use-case'

class ListBlockReasonController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search,
      page,
      pageSize,
      order,
      filter
    } = request.body

    const listBlockReasonUseCase = container.resolve(ListBlockReasonUseCase)

    const blockReasons = await listBlockReasonUseCase.execute({
      search: search as string,
      page: Number(page) as number,
      rowsPerPage: Number(pageSize) as number,
      order: order as string,
      filter: filter as string
    })

    return response.json(blockReasons)
  }
}

export { ListBlockReasonController }
