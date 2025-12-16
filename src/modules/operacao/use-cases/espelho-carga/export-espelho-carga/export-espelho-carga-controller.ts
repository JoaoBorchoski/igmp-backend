import { Request, Response } from "express"
import { container } from "tsyringe"
import { ExportEspelhoCargaUseCase } from "./export-espelho-carga-use-case"

class ExportEspelhoCargaController {
	async handle(request: Request, response: Response): Promise<Response> {
		const { id } = request.params

		const exportEspelhoCargaUseCase = container.resolve(ExportEspelhoCargaUseCase)

		const result = await exportEspelhoCargaUseCase.execute(id)

		if (result.statusCode === 200 && result.data instanceof Buffer) {
			response.setHeader("Content-Type", "application/pdf")
			response.setHeader("Content-Disposition", `attachment; filename="registro-embarque-${id}.pdf"`)
			return response.status(result.statusCode).send(result.data)
		}

		return response.status(result.statusCode).json(result.data)
	}
}

export { ExportEspelhoCargaController }
