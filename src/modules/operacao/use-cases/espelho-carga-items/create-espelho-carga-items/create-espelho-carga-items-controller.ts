import { Request, Response } from "express"
import { container } from "tsyringe"
import { CreateEspelhoCargaItemsUseCase } from "./create-espelho-carga-items-use-case"
import { HttpResponse } from "@shared/helpers"

class CreateEspelhoCargaItemsController {
	async handle(request: Request, response: Response): Promise<Response> {
		const { espelhoCargaId, pacoteItemId, quantidade } = request.body

		const createEspelhoCargaItemsUseCase = container.resolve(CreateEspelhoCargaItemsUseCase)

		const result = await createEspelhoCargaItemsUseCase
			.execute({
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

export { CreateEspelhoCargaItemsController }
