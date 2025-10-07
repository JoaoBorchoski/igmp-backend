import { Request, Response } from "express"
import { container } from "tsyringe"
import { HttpResponse } from "@shared/helpers"
import { CreatePedidoImportUseCase } from "./create-pedido-import-use-case"

class CreatePedidoImportController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { pedido, itens, itemsCriados } = request.body

        const createPedidoUseCase = container.resolve(CreatePedidoImportUseCase)

        const result = await createPedidoUseCase
            .execute({
                pedido,
                itens,
                itemsCriadosReq: itemsCriados,
            })
            .then((pedidoResult) => {
                return pedidoResult
            })
            .catch((error) => {
                return error
            })

        if (result.statusCode === 200) {
            response.setHeader("Content-Type", "application/pdf")
            response.setHeader("Content-Disposition", `attachment; filename="pedido-teste.pdf"`)
            return response.send(result.data)
        }

        return response.status(result.statusCode).json(result)
    }
}

export { CreatePedidoImportController }
