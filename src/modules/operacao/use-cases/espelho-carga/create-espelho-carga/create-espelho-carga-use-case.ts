import { inject, injectable } from "tsyringe"
import { IEspelhoCargaRepository } from "@modules/operacao/repositories/i-espelho-carga-repository"
import { IEspelhoCargaItemsRepository } from "@modules/operacao/repositories/i-espelho-carga-items-repository"
import { AppError } from "@shared/errors/app-error"
import { getConnection } from "typeorm"
import { HttpResponse, serverError } from "@shared/helpers"

interface IRequest {
	pedidoId: string
	placa: string
	motorista: string
	lote: string
	descricao: string
	espelhoCargaItems: any[]
}

@injectable()
class CreateEspelhoCargaUseCase {
	constructor(
		@inject("EspelhoCargaRepository")
		private espelhoCargaRepository: IEspelhoCargaRepository,
		@inject("EspelhoCargaItemsRepository")
		private espelhoCargaItemsRepository: IEspelhoCargaItemsRepository
	) {}

	async execute({ pedidoId, placa, motorista, lote, descricao, espelhoCargaItems }: IRequest): Promise<HttpResponse> {
		const queryRunner = getConnection().createQueryRunner()
		await queryRunner.startTransaction()

		console.log("espelhoCargaItems", espelhoCargaItems)
		console.log("pedidoId", pedidoId)
		console.log("placa", placa)
		console.log("motorista", motorista)
		console.log("lote", lote)
		console.log("descricao", descricao)

		try {
			const result = await this.espelhoCargaRepository
				.createWithQueryRunner(
					{
						pedidoId,
						placa,
						motorista,
						lote,
						descricao,
					},
					queryRunner.manager
				)
				.then((espelhoCargaResult) => {
					return espelhoCargaResult
				})
				.catch((error) => {
					return error
				})

			console.log("result", result)

			const items = espelhoCargaItems.reduce((acc, item) => [...acc, ...item.items], [])

			for await (const item of items) {
				await this.espelhoCargaItemsRepository.createWithQueryRunner(
					{
						espelhoCargaId: result.data.id,
						pacoteItemId: item.id,
						quantidade: item.quantidade,
					},
					queryRunner.manager
				)
			}

			await queryRunner.commitTransaction()
			return result
		} catch (error) {
			await queryRunner.rollbackTransaction()
			console.log("Error creating espelho_carga:", error)
			return serverError(error)
		} finally {
			await queryRunner.release()
		}
	}
}

export { CreateEspelhoCargaUseCase }
