import { Request, Response } from "express"
import { container } from "tsyringe"
import { GetEspelhoCargaItemsUseCase } from "./get-espelho-carga-items-use-case"
import { HttpResponse } from "@shared/helpers"

class GetEspelhoCargaItemsController {
	async handle(request: Request, response: Response): Promise<Response> {
		const { id } = request.params

		const getEspelhoCargaItemsUseCase = container.resolve(GetEspelhoCargaItemsUseCase)

		const result = await getEspelhoCargaItemsUseCase.execute(id)

		return response.status(result.statusCode).json(result)
	}
}

export { GetEspelhoCargaItemsController }
