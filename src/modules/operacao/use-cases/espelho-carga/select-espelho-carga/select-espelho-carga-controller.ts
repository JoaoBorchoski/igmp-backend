import { Request, Response } from "express"
import { container } from "tsyringe"
import { SelectEspelhoCargaUseCase } from "./select-espelho-carga-use-case"

class SelectEspelhoCargaController {
	async handle(request: Request, response: Response): Promise<Response> {
		const { filter } = request.query

		const selectEspelhoCargaUseCase = container.resolve(SelectEspelhoCargaUseCase)

		const result = await selectEspelhoCargaUseCase.execute({
			filter: filter as string,
		})

		return response.json(result)
	}
}

export { SelectEspelhoCargaController }
