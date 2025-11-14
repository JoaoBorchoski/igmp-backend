import { Request, Response } from "express"
import { container } from "tsyringe"
import { SelectEspelhoCargaItemsUseCase } from "./select-espelho-carga-items-use-case"

class SelectEspelhoCargaItemsController {
	async handle(request: Request, response: Response): Promise<Response> {
		const { filter, espelhoCargaId } = request.query

		const selectEspelhoCargaItemsUseCase = container.resolve(SelectEspelhoCargaItemsUseCase)

		const result = await selectEspelhoCargaItemsUseCase.execute({
			filter: filter as string,
			espelhoCargaId: espelhoCargaId as string,
		})

		return response.json(result)
	}
}

export { SelectEspelhoCargaItemsController }
