import { inject, injectable } from "tsyringe"
import { Pacote } from "@modules/operacao/infra/typeorm/entities/pacote"
import { IPacoteRepository } from "@modules/operacao/repositories/i-pacote-repository"
import { AppError } from "@shared/errors/app-error"
import { HttpResponse } from "@shared/helpers"

interface IRequest {
	id: string
	espelhoCargaId: string
}

@injectable()
class ConfirmaCarregamentoPacoteUseCase {
	constructor(
		@inject("PacoteRepository")
		private pacoteRepository: IPacoteRepository
	) {}

	async execute({ id, espelhoCargaId }: IRequest): Promise<HttpResponse> {
		const pacote = await this.pacoteRepository.updatePacoteItemStatus(id, espelhoCargaId)

		return pacote
	}
}

export { ConfirmaCarregamentoPacoteUseCase }
