import { inject, injectable } from 'tsyringe'
import { IPedidoRepository } from '@modules/operacao/repositories/i-pedido-repository'
import { conflictError, HttpResponse } from '@shared/helpers'
import { IPacoteRepository } from '@modules/operacao/repositories/i-pacote-repository'
import { AppError } from '@shared/errors/app-error'

@injectable()
class DeletePedidoUseCase {
	constructor(
		@inject('PedidoRepository')
		private pedidoRepository: IPedidoRepository,
		@inject('PacoteRepository')
		private pacoteRepository: IPacoteRepository,
	) {}

	async execute(id: string): Promise<HttpResponse> {
		const alreadyHasPacote = await this.pacoteRepository.getByPedidoId(id)

		if (alreadyHasPacote.statusCode === 200) {
			throw new AppError('Pedido já tem pacote', 409)
		}

		const pedido = await this.pedidoRepository.delete(id)

		return pedido
	}
}

export { DeletePedidoUseCase }
