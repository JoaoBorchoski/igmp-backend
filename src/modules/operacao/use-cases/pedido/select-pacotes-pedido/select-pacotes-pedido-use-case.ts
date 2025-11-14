import { inject, injectable } from "tsyringe"
import { IPedidoItemRepository } from "@modules/operacao/repositories/i-pedido-item-repository"
import { IPacoteRepository } from "@modules/operacao/repositories/i-pacote-repository"

interface ResponseProps {
	items?: object[]
	hasNext?: boolean
	value?: string
	label?: string
}

@injectable()
class SelectPacotesPedidoUseCase {
	constructor(
		@inject("PacoteRepository")
		private pacoteRepository: IPacoteRepository
	) {}

	async execute({ filter, pedidoId }): Promise<ResponseProps> {
		const pacotes = await this.pacoteRepository.selectPacotesByPedidoId(filter, pedidoId)

		const newPacotes = {
			items: pacotes.data,
			hasNext: false,
		}

		return newPacotes
	}
}

export { SelectPacotesPedidoUseCase }
