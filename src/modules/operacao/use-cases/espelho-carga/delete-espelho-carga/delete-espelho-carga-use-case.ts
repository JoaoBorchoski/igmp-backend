import { inject, injectable } from "tsyringe"
import { IEspelhoCargaRepository } from "@modules/operacao/repositories/i-espelho-carga-repository"
import { HttpResponse } from "@shared/helpers"

@injectable()
class DeleteEspelhoCargaUseCase {
	constructor(
		@inject("EspelhoCargaRepository")
		private espelhoCargaRepository: IEspelhoCargaRepository
	) {}

	async execute(id: string): Promise<HttpResponse> {
		const espelhoCarga = await this.espelhoCargaRepository.delete(id)

		return espelhoCarga
	}
}

export { DeleteEspelhoCargaUseCase }
