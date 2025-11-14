import { Request, Response } from "express"
import { container } from "tsyringe"
import { CreateEspelhoCargaUseCase } from "./create-espelho-carga-use-case"
import { HttpResponse } from "@shared/helpers"

class CreateEspelhoCargaController {
	async handle(request: Request, response: Response): Promise<Response> {
		const { pedidoId, placa, motorista, lote, descricao, espelhoCargaItems } = request.body

		const createEspelhoCargaUseCase = container.resolve(CreateEspelhoCargaUseCase)

		const result = await createEspelhoCargaUseCase
			.execute({
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

export { CreateEspelhoCargaController }
