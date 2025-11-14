import { Request, Response } from "express"
import { container } from "tsyringe"
import { UpdateEspelhoCargaItemsUseCase } from "./update-espelho-carga-items-use-case"
import { HttpResponse } from "@shared/helpers"

class UpdateEspelhoCargaItemsController {
	async handle(request: Request, response: Response): Promise<Response> {
		const { id } = request.params
		const { espelhoCargaId, pacoteItemId, quantidade } = request.body

		const updateEspelhoCargaItemsUseCase = container.resolve(UpdateEspelhoCargaItemsUseCase)

		const result = await updateEspelhoCargaItemsUseCase
			.execute({
				id,
				espelhoCargaId,
				pacoteItemId,
				quantidade,
			})
			.then((espelhoCargaItemsResult) => {
				return espelhoCargaItemsResult
			})
			.catch((error) => {
				return error
			})

		return response.status(result.statusCode).json(result)
	}
}

export { UpdateEspelhoCargaItemsController }
