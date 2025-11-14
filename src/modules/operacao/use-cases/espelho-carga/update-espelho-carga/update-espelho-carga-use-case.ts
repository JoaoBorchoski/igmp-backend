import { inject, injectable } from "tsyringe"
import { IEspelhoCargaRepository } from "@modules/operacao/repositories/i-espelho-carga-repository"
import { IEspelhoCargaItemsRepository } from "@modules/operacao/repositories/i-espelho-carga-items-repository"
import { AppError } from "@shared/errors/app-error"
import { HttpResponse, serverError } from "@shared/helpers"
import { getConnection } from "typeorm"

interface IRequest {
	id: string
	pedidoId: string
	placa: string
	motorista: string
	lote: string
	descricao: string
	espelhoCargaItems: any[]
}

@injectable()
class UpdateEspelhoCargaUseCase {
	constructor(
		@inject("EspelhoCargaRepository")
		private espelhoCargaRepository: IEspelhoCargaRepository,
		@inject("EspelhoCargaItemsRepository")
		private espelhoCargaItemsRepository: IEspelhoCargaItemsRepository
	) {}

	async execute({
		id,
		pedidoId,
		placa,
		motorista,
		lote,
		descricao,
		espelhoCargaItems,
	}: IRequest): Promise<HttpResponse> {
		const queryRunner = getConnection().createQueryRunner()
		await queryRunner.startTransaction()

		try {
			const espelhoCarga = await this.espelhoCargaRepository.updateWithQueryRunner(
				{
					id,
					pedidoId,
					placa,
					motorista,
					lote,
					descricao,
				},
				queryRunner.manager
			)

			await this.espelhoCargaItemsRepository.deleteByEspelhoCargaIdWithQueryRunner(id, queryRunner.manager)

			const items = espelhoCargaItems.reduce((acc, item) => [...acc, ...item.items], [])

			for await (const item of items) {
				await this.espelhoCargaItemsRepository.createWithQueryRunner(
					{
						espelhoCargaId: id,
						pacoteItemId: item.id,
						quantidade: item.quantidade,
					},
					queryRunner.manager
				)
			}

			await queryRunner.commitTransaction()
			return espelhoCarga
		} catch (error) {
			console.log("Error updating espelho_carga:", error)
			await queryRunner.rollbackTransaction()
			return serverError(error)
		} finally {
			await queryRunner.release()
		}
	}
}

export { UpdateEspelhoCargaUseCase }
