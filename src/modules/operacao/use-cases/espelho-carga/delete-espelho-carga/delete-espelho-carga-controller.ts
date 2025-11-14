import { Request, Response } from "express"
import { container } from "tsyringe"
import { DeleteEspelhoCargaUseCase } from "./delete-espelho-carga-use-case"
import { HttpResponse } from "@shared/helpers"

class DeleteEspelhoCargaController {
	async handle(request: Request, response: Response): Promise<Response> {
		const { id } = request.params

		const deleteEspelhoCargaUseCase = container.resolve(DeleteEspelhoCargaUseCase)

		const result = await deleteEspelhoCargaUseCase.execute(id)

		return response.status(result.statusCode).json(result)
	}
}

export { DeleteEspelhoCargaController }
