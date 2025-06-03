import { Request, Response } from "express"
import { container } from "tsyringe"
import { ListProdutoUseCase } from "./list-produto-use-case"

class ListProdutoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { search, page, pageSize, order, filter } = request.body

    const listProdutoUseCase = container.resolve(ListProdutoUseCase)

    const tiposPorta = await listProdutoUseCase.execute({
      search: search as string,
      page: Number(page) as number,
      rowsPerPage: Number(pageSize) as number,
      order: order as string,
      filter: filter as string,
    })

    return response.json(tiposPorta)
  }
}

export { ListProdutoController }
