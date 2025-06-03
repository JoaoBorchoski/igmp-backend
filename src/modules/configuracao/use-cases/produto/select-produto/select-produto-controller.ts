import { Request, Response } from "express"
import { container } from "tsyringe"
import { SelectProdutoUseCase } from "./select-produto-use-case"

class SelectProdutoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { filter } = request.query

    const selectProdutoUseCase = container.resolve(SelectProdutoUseCase)

    const tiposPorta = await selectProdutoUseCase.execute({
      filter: filter as string,
    })

    return response.json(tiposPorta)
  }
}

export { SelectProdutoController }
