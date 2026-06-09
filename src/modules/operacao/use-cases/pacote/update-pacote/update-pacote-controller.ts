import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UpdatePacoteUseCase } from './update-pacote-use-case'

class UpdatePacoteController {
	async handle(request: Request, response: Response): Promise<Response> {
		const { pedidoId, descricao, pacoteItems, cor } = request.body

		const { id } = request.params

		const updatePacoteUseCase = container.resolve(UpdatePacoteUseCase)

		const result = await updatePacoteUseCase
			.execute({
				id,
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

export { UpdatePacoteController }
