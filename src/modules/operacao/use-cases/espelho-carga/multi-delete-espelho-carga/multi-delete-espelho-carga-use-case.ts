import { inject, injectable } from "tsyringe"
import { IEspelhoCargaRepository } from "@modules/operacao/repositories/i-espelho-carga-repository"
import { HttpResponse } from "@shared/helpers"

@injectable()
class MultiDeleteEspelhoCargaUseCase {
	constructor(
		@inject("EspelhoCargaRepository")
		private espelhoCargaRepository: IEspelhoCargaRepository
	) {}

	async execute(ids: string[]): Promise<HttpResponse> {
		const espelhoCarga = await this.espelhoCargaRepository.multiDelete(ids)

		return espelhoCarga
	}
}

export { MultiDeleteEspelhoCargaUseCase }
