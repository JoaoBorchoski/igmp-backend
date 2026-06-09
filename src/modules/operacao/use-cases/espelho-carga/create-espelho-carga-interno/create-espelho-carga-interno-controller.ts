import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateEspelhoCargaInternoUseCase } from './create-espelho-carga-interno-use-case'
import { HttpResponse } from '@shared/helpers'

class CreateEspelhoCargaInternoController {
	async handle(request: Request, response: Response): Promise<Response> {
		const { pedidoId, placa, motorista, lote, descricao, espelhoCargaItems } = request.body

		const createEspelhoCargaInternoUseCase = container.resolve(CreateEspelhoCargaInternoUseCase)

		const result = await createEspelhoCargaInternoUseCase
			.execute({
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

export { CreateEspelhoCargaInternoController }
