import { Request, Response } from "express"
import { container } from "tsyringe"
import { ListEspelhoCargaItemsUseCase } from "./list-espelho-carga-items-use-case"

class ListEspelhoCargaItemsController {
	async handle(request: Request, response: Response): Promise<Response> {
		const { search, page, rowsPerPage, order, filter } = request.body

		const listEspelhoCargaItemsUseCase = container.resolve(ListEspelhoCargaItemsUseCase)

		const result = await listEspelhoCargaItemsUseCase.execute({
			search,
			page,
			rowsPerPage,
			order,
			filter,
		})

		return response.json(result)
	}
}

export { ListEspelhoCargaItemsController }
