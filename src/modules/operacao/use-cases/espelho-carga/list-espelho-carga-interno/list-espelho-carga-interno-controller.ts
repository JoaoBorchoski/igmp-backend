import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListEspelhoCargaInternoUseCase } from './list-espelho-carga-interno-use-case'

class ListEspelhoCargaInternoController {
	async handle(request: Request, response: Response): Promise<Response> {
		const { search, page, rowsPerPage, order, filter } = request.body

		const listEspelhoCargaInternoUseCase = container.resolve(ListEspelhoCargaInternoUseCase)

		const result = await listEspelhoCargaInternoUseCase.execute({
			search,
			page,
			rowsPerPage,
			order,
			filter,
		})

		return response.json(result)
	}
}

export { ListEspelhoCargaInternoController }
