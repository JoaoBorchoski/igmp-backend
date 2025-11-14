import { Request, Response } from "express"
import { container } from "tsyringe"
import { GetEspelhoCargaUseCase } from "./get-espelho-carga-use-case"
import { HttpResponse } from "@shared/helpers"

class GetEspelhoCargaController {
	async handle(request: Request, response: Response): Promise<Response> {
		const { id } = request.params

		const getEspelhoCargaUseCase = container.resolve(GetEspelhoCargaUseCase)

		const result = await getEspelhoCargaUseCase.execute(id)

		return response.status(result.statusCode).json(result.data)
	}
}

export { GetEspelhoCargaController }
