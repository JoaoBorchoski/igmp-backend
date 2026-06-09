import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListEspelhoCargaUseCase } from './list-espelho-carga-use-case'

class ListEspelhoCargaController {
	async handle(request: Request, response: Response): Promise<Response> {
		const { search, page, rowsPerPage, order, filter } = request.body

		const listEspelhoCargaUseCase = container.resolve(ListEspelhoCargaUseCase)

		const result = await listEspelhoCargaUseCase.execute({
			search,
			page,
			rowsPerPage,
			order,
			filter,
		})

		return response.json(result)
	}
}

export { ListEspelhoCargaController }
