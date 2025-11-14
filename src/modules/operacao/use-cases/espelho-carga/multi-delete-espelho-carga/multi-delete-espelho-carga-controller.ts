import { Request, Response } from "express"
import { container } from "tsyringe"
import { MultiDeleteEspelhoCargaUseCase } from "./multi-delete-espelho-carga-use-case"
import { HttpResponse } from "@shared/helpers"

class MultiDeleteEspelhoCargaController {
	async handle(request: Request, response: Response): Promise<Response> {
		const { ids } = request.body

		const multiDeleteEspelhoCargaUseCase = container.resolve(MultiDeleteEspelhoCargaUseCase)

		const result = await multiDeleteEspelhoCargaUseCase.execute(ids)

		return response.status(result.statusCode).json(result)
	}
}

export { MultiDeleteEspelhoCargaController }
