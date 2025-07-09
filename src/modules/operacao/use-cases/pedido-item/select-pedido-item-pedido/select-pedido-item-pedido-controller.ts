import { Request, Response } from "express"
import { container } from "tsyringe"
import { SelectPedidoItemPedidoUseCase } from "./select-pedido-item-pedido-use-case"

class SelectPedidoItemPedidoController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { filter, pedidoId } = request.query

        const selectPedidoItemPedidoUseCase = container.resolve(SelectPedidoItemPedidoUseCase)

        const pedidosItems = await selectPedidoItemPedidoUseCase.execute({
            filter: filter as string,
            pedidoId: pedidoId as string,
        })

        return response.json(pedidosItems)
    }
}

export { SelectPedidoItemPedidoController }
