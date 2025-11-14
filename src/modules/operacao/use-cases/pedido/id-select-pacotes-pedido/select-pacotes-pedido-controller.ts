import { Request, Response } from "express"
import { container } from "tsyringe"
import { IdSelectPacotesPedidoUseCase } from "./select-pacotes-pedido-use-case"

class IdSelectPacotesPedidoController {
	async handle(request: Request, response: Response): Promise<Response> {
		const { id } = request.params

		const idSelectPacotesPedidoUseCase = container.resolve(IdSelectPacotesPedidoUseCase)

		const pacotes = await idSelectPacotesPedidoUseCase.execute({
			id: id as string,
		})

		return response.json(pacotes.data)
	}
}

export { IdSelectPacotesPedidoController }
