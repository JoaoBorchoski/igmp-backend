import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ConfirmaDescarregamentoPacoteUseCase } from './confirma-descarregamento-pacote-use-case'

class ConfirmaDescarregamentoPacoteController {
	async handle(request: Request, response: Response): Promise<Response> {
		const { id, espelhoCargaId } = request.params

		const confirmaDescarregamentoPacoteUseCase = container.resolve(ConfirmaDescarregamentoPacoteUseCase)

		const result = await confirmaDescarregamentoPacoteUseCase
			.execute({
				id,
				espelhoCargaId,
			})
			.then((descarregamentoPacoteResult) => {
				return descarregamentoPacoteResult
			})
			.catch((error) => {
				return error
			})

		return response.status(result.statusCode).json(result)
	}
}

export { ConfirmaDescarregamentoPacoteController }
