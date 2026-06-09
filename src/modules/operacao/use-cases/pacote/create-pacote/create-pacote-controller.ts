import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreatePacoteUseCase } from './create-pacote-use-case'
import { HttpResponse } from '@shared/helpers'

class CreatePacoteController {
	async handle(request: Request, response: Response): Promise<Response> {
		const { pedidoId, descricao, pacoteItems, cor } = request.body

		const createPacoteUseCase = container.resolve(CreatePacoteUseCase)

		const result = await createPacoteUseCase
			.execute({
				pedidoId,
				descricao,
				pacoteItems,
				cor,
			})
			.then((pacoteResult) => {
				return pacoteResult
			})
			.catch((error) => {
				return error
			})

		if (result.statusCode === 200) {
			response.setHeader('Content-Type', 'application/pdf')
			response.setHeader('Content-Disposition', `attachment; filename="pacote-${pedidoId}.pdf"`)
			return response.send(result.data)
		}

		return response.status(result.statusCode).json(result)
	}
}

export { CreatePacoteController }
