import { Request, Response } from "express"
import { container } from "tsyringe"
import { DeleteEspelhoCargaItemsUseCase } from "./delete-espelho-carga-items-use-case"
import { HttpResponse } from "@shared/helpers"

class DeleteEspelhoCargaItemsController {
	async handle(request: Request, response: Response): Promise<Response> {
		const { id } = request.params

		const deleteEspelhoCargaItemsUseCase = container.resolve(DeleteEspelhoCargaItemsUseCase)

		const result = await deleteEspelhoCargaItemsUseCase.execute(id)

		return response.status(result.statusCode).json(result)
	}
}

export { DeleteEspelhoCargaItemsController }
