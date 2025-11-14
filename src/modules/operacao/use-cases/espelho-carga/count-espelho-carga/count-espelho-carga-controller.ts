import { Request, Response } from "express"
import { container } from "tsyringe"
import { CountEspelhoCargaUseCase } from "./count-espelho-carga-use-case"
import { HttpResponse } from "@shared/helpers"

class CountEspelhoCargaController {
	async handle(request: Request, response: Response): Promise<Response> {
		const { search, filter } = request.body

		const countEspelhoCargaUseCase = container.resolve(CountEspelhoCargaUseCase)

		const result = await countEspelhoCargaUseCase.execute({
			search,
			filter,
		})

		return response.status(result.statusCode).json(result)
	}
}

export { CountEspelhoCargaController }
