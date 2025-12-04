import { Request, Response } from "express"
import { container } from "tsyringe"
import { ExportEspelhoCargaUseCase } from "./export-espelho-carga-use-case"
import { HttpResponse } from "@shared/helpers"

class ExportEspelhoCargaController {
	async handle(request: Request, response: Response): Promise<Response> {
		const { id } = request.params

		const exportEspelhoCargaUseCase = container.resolve(ExportEspelhoCargaUseCase)

		const result = await exportEspelhoCargaUseCase.execute(id)

		return response.status(result.statusCode).json(result.data)
	}
}

export { ExportEspelhoCargaController }
