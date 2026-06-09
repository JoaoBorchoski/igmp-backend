import { Request, Response } from "express"
import { container } from "tsyringe"
import { ListEspelhoCargaAbertoUseCase } from "./list-espelho-carga-aberto-use-case"

class ListEspelhoCargaAbertoController {
	async handle(request: Request, response: Response): Promise<Response> {
		const { search, page, rowsPerPage, order, filter } = request.body

		const listEspelhoCargaAbertoUseCase = container.resolve(ListEspelhoCargaAbertoUseCase)

		const espelhosCargaAberto = await listEspelhoCargaAbertoUseCase.execute({
			search,
			page,
			rowsPerPage,
			order,
			filter,
		})

		return response.json(espelhosCargaAberto)
	}
}

export { ListEspelhoCargaAbertoController }
