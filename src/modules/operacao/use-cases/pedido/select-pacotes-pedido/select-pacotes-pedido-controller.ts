import { Request, Response } from "express"
import { container } from "tsyringe"
import { SelectPacotesPedidoUseCase } from "./select-pacotes-pedido-use-case"

class SelectPacotesPedidoController {
	async handle(request: Request, response: Response): Promise<Response> {
		const { filter, pedidoId } = request.query

		const selectPacotesPedidoUseCase = container.resolve(SelectPacotesPedidoUseCase)

		const pacotes = await selectPacotesPedidoUseCase.execute({
			filter: filter as string,
			pedidoId: pedidoId as string,
		})

		return response.json(pacotes)
	}
}

export { SelectPacotesPedidoController }
