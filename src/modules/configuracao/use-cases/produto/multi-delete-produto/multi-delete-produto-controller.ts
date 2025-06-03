import { Request, Response } from "express"
import { container } from "tsyringe"
import { MultiDeleteProdutoUseCase } from "./multi-delete-produto-use-case"
import { ListProdutoUseCase } from "../list-produto/list-produto-use-case"

class MultiDeleteProdutoController {
  async handle(request: Request, response: Response): Promise<Response> {
    // delete multi record

    const ids = request.body
    const multiDeleteProdutoUseCase = container.resolve(MultiDeleteProdutoUseCase)
    await multiDeleteProdutoUseCase.execute(ids)

    // restore list with updated records

    const listProdutoUseCase = container.resolve(ListProdutoUseCase)
    const tiposPorta = await listProdutoUseCase.execute({
      search: "",
      page: 0,
      rowsPerPage: 100,
      order: "",
    })

    return response.json(tiposPorta)
  }
}

export { MultiDeleteProdutoController }
