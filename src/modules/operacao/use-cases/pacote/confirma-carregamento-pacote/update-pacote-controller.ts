import { Request, Response } from "express"
import { container } from "tsyringe"
import { ConfirmaCarregamentoPacoteUseCase } from "./update-pacote-use-case"

class ConfirmaCarregamentoPacoteController {
	async handle(request: Request, response: Response): Promise<Response> {
		const { id, espelhoCargaId } = request.params

		const confirmaCarregamentoPacoteUseCase = container.resolve(ConfirmaCarregamentoPacoteUseCase)

		const result = await confirmaCarregamentoPacoteUseCase
			.execute({
				id,
				espelhoCargaId,
			})
			.then((pacoteResult) => {
				return pacoteResult
			})
			.catch((error) => {
				return error
			})

		return response.status(result.statusCode).json(result)
	}
}

export { ConfirmaCarregamentoPacoteController }
