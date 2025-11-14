import { Request, Response } from "express"
import { container } from "tsyringe"
import { CountEspelhoCargaItemsUseCase } from "./count-espelho-carga-items-use-case"
import { HttpResponse } from "@shared/helpers"

class CountEspelhoCargaItemsController {
	async handle(request: Request, response: Response): Promise<Response> {
		const { search, filter } = request.body

		const countEspelhoCargaItemsUseCase = container.resolve(CountEspelhoCargaItemsUseCase)

		const result = await countEspelhoCargaItemsUseCase.execute({
			search,
			filter,
		})

		return response.status(result.statusCode).json(result)
	}
}

export { CountEspelhoCargaItemsController }
