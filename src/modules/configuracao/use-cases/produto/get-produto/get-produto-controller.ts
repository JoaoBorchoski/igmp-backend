import { Request, Response } from "express"
import { container } from "tsyringe"
import { GetProdutoUseCase } from "./get-produto-use-case"

class GetProdutoController {
    async handle(request: Request, response: Response): Promise<Response> {
        const id = request.params.id

        const getProdutoUseCase = container.resolve(GetProdutoUseCase)

        const tipoPorta = await getProdutoUseCase.execute(id)

        return response.status(tipoPorta.statusCode).json(tipoPorta.data)
    }
}

export { GetProdutoController }
