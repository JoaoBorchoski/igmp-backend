import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UpdateEspelhoCargaInternoUseCase } from './update-espelho-carga-interno-use-case'
import { HttpResponse } from '@shared/helpers'

class UpdateEspelhoCargaInternoController {
	async handle(request: Request, response: Response): Promise<Response> {
		const { id } = request.params
		const { pedidoId, placa, motorista, lote, descricao, espelhoCargaItems } = request.body

		const updateEspelhoCargaInternoUseCase = container.resolve(UpdateEspelhoCargaInternoUseCase)

		const result = await updateEspelhoCargaInternoUseCase
			.execute({
				id,
				pedidoId,
				placa,
				motorista,
				lote,
				descricao,
				espelhoCargaItems,
			})
			.then((espelhoCargaResult) => {
				return espelhoCargaResult
			})
			.catch((error) => {
				return error
			})

		return response.status(result.statusCode).json(result)
	}
}

export { UpdateEspelhoCargaInternoController }
