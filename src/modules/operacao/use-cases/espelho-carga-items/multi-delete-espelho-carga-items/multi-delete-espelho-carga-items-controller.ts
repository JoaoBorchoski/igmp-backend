import { Request, Response } from "express"
import { container } from "tsyringe"
import { MultiDeleteEspelhoCargaItemsUseCase } from "./multi-delete-espelho-carga-items-use-case"
import { HttpResponse } from "@shared/helpers"

class MultiDeleteEspelhoCargaItemsController {
	async handle(request: Request, response: Response): Promise<Response> {
		const { ids } = request.body

		const multiDeleteEspelhoCargaItemsUseCase = container.resolve(MultiDeleteEspelhoCargaItemsUseCase)

		const result = await multiDeleteEspelhoCargaItemsUseCase.execute(ids)

		return response.status(result.statusCode).json(result)
	}
}

export { MultiDeleteEspelhoCargaItemsController }
