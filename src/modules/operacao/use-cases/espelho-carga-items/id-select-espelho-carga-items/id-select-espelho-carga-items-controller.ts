import { Request, Response } from "express"
import { container } from "tsyringe"
import { IdSelectEspelhoCargaItemsUseCase } from "./id-select-espelho-carga-items-use-case"
import { HttpResponse } from "@shared/helpers"

class IdSelectEspelhoCargaItemsController {
	async handle(request: Request, response: Response): Promise<Response> {
		const { id } = request.params

		const idSelectEspelhoCargaItemsUseCase = container.resolve(IdSelectEspelhoCargaItemsUseCase)

		const result = await idSelectEspelhoCargaItemsUseCase.execute({ id })

		return response.status(result.statusCode).json(result)
	}
}

export { IdSelectEspelhoCargaItemsController }
