import { Request, Response } from "express"
import { container } from "tsyringe"
import { UpdateEspelhoCargaUseCase } from "./update-espelho-carga-use-case"
import { HttpResponse } from "@shared/helpers"

class UpdateEspelhoCargaController {
	async handle(request: Request, response: Response): Promise<Response> {
		const { id } = request.params
		const { pedidoId, placa, motorista, lote, descricao, espelhoCargaItems } = request.body

		const updateEspelhoCargaUseCase = container.resolve(UpdateEspelhoCargaUseCase)

		const result = await updateEspelhoCargaUseCase
			.execute({
				id,
				pedidoId,
				placa,
				motorista,
				lote,
				descricao,
				espelhoCargaItems,
			})
			.then((espelhoCargaResult) => {
				return espelhoCargaResult
			})
			.catch((error) => {
				return error
			})

		return response.status(result.statusCode).json(result)
	}
}

export { UpdateEspelhoCargaController }
