import { Request, Response } from "express"
import { container } from "tsyringe"
import { GetPacoteProdutoInfoUseCase } from "./get-pacote-produto-info-use-case"

class GetPacoteProdutoInfoController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { produtoId, pedidoId } = request.params
        const getPacoteProdutoInfoUseCase = container.resolve(GetPacoteProdutoInfoUseCase)
        const pacote = await getPacoteProdutoInfoUseCase.execute(produtoId, pedidoId)

        return response.status(pacote.statusCode).json(pacote.data)
    }
}

export { GetPacoteProdutoInfoController }
