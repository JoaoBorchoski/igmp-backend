import { Request, Response } from "express"
import { container } from "tsyringe"
import { CountProdutoUseCase } from "./count-tipo-porta-use-case"

class CountProdutoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { search } = request.body

    const countProdutoUseCase = container.resolve(CountProdutoUseCase)

    const tiposPortaCount = await countProdutoUseCase.execute({
      search: search as string,
    })

    return response.status(tiposPortaCount.statusCode).json(tiposPortaCount)
  }
}

export { CountProdutoController }
