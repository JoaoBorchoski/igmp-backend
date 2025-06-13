import { Request, Response } from "express"
import { container } from "tsyringe"
import { ImportPedidosUseCase } from "./import-pedido-use-case"

class ImportPedidosController {
    async handle(request: Request, response: Response): Promise<Response> {
        if (!request.file) {
            return response.status(400).json({ error: "Nenhum arquivo foi enviado." })
        }
        const importPedidosUseCase = container.resolve(ImportPedidosUseCase)

        const result = await importPedidosUseCase.execute({
            file: request.file,
        })

        return response.status(result.statusCode).send(result)
    }
}

export { ImportPedidosController }
