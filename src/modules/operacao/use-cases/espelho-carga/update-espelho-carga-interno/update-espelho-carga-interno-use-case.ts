import { inject, injectable } from 'tsyringe'
import { IEspelhoCargaRepository } from '@modules/operacao/repositories/i-espelho-carga-repository'
import { IEspelhoCargaItemsRepository } from '@modules/operacao/repositories/i-espelho-carga-items-repository'
import { AppError } from '@shared/errors/app-error'
import { HttpResponse, serverError } from '@shared/helpers'
import { getConnection } from 'typeorm'

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
class UpdateEspelhoCargaInternoUseCase {
	constructor(
		@inject('EspelhoCargaRepository')
		private espelhoCargaRepository: IEspelhoCargaRepository,
		@inject('EspelhoCargaItemsRepository')
		private espelhoCargaItemsRepository: IEspelhoCargaItemsRepository
	) {}

	async execute({ id, pedidoId, placa, motorista, lote, descricao, espelhoCargaItems }: IRequest): Promise<HttpResponse> {
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
					interno: true,
				},
				queryRunner.manager
			)

			const items = espelhoCargaItems.reduce((acc, item) => [...acc, ...item.items], [])
			const itemsOld = await this.espelhoCargaItemsRepository.getByEspelhoCargaId(id)

			const itemsApagados = itemsOld.data.filter((item) => !items.some((itemEspelhoCarga) => itemEspelhoCarga.id === item.pacoteItemId))
			// const itemsAtualizados = items.filter((item) => itemsOld.data.some((itemEspelhoCarga) => itemEspelhoCarga.pacoteItemId === item.id))
			const itemsCriados = items.filter((item) => !itemsOld.data.some((itemEspelhoCarga) => itemEspelhoCarga.pacoteItemId === item.id))

			if (itemsApagados.length > 0) {
				await this.espelhoCargaItemsRepository.deleteWithQueryRunner(
					itemsApagados.map((item) => item.id),
					queryRunner.manager
				)
			}

			if (itemsCriados.length > 0) {
				for await (const item of itemsCriados) {
					await this.espelhoCargaItemsRepository.createWithQueryRunner(
						{
							espelhoCargaId: id,
							pacoteItemId: item.id,
							quantidade: item.quantidade,
						},
						queryRunner.manager
					)
				}
			}

			await queryRunner.commitTransaction()
			return espelhoCarga
		} catch (error) {
			console.log('Error updating espelho_carga:', error)
			await queryRunner.rollbackTransaction()
			return serverError(error)
		} finally {
			await queryRunner.release()
		}
	}
}

export { UpdateEspelhoCargaInternoUseCase }
