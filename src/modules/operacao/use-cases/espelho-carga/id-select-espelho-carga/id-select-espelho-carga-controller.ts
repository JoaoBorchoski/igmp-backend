import { Request, Response } from "express"
import { container } from "tsyringe"
import { IdSelectEspelhoCargaUseCase } from "./id-select-espelho-carga-use-case"
import { HttpResponse } from "@shared/helpers"

class IdSelectEspelhoCargaController {
	async handle(request: Request, response: Response): Promise<Response> {
		const { id } = request.params

		const idSelectEspelhoCargaUseCase = container.resolve(IdSelectEspelhoCargaUseCase)

		const result = await idSelectEspelhoCargaUseCase.execute({ id })

		return response.status(result.statusCode).json(result)
	}
}

export { IdSelectEspelhoCargaController }
