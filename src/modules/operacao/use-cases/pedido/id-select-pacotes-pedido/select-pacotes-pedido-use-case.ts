import { inject, injectable } from "tsyringe"
import { IPacoteRepository } from "@modules/operacao/repositories/i-pacote-repository"
import { HttpResponse } from "@shared/helpers"

@injectable()
class IdSelectPacotesPedidoUseCase {
	constructor(
		@inject("PacoteRepository")
		private pacoteRepository: IPacoteRepository
	) {}

	async execute({ id }): Promise<HttpResponse> {
		const pacotes = await this.pacoteRepository.idSelectPacotesByPedidoId(id)

		return pacotes
	}
}

export { IdSelectPacotesPedidoUseCase }
