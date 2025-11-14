import { inject, injectable } from "tsyringe"
import { IEspelhoCargaRepository } from "@modules/operacao/repositories/i-espelho-carga-repository"
import { HttpResponse } from "@shared/helpers/http"

@injectable()
class IdSelectEspelhoCargaUseCase {
	constructor(
		@inject("EspelhoCargaRepository")
		private espelhoCargaRepository: IEspelhoCargaRepository
	) {}

	async execute({ id }): Promise<HttpResponse> {
		const espelhoCarga = await this.espelhoCargaRepository.idSelect(id)

		return espelhoCarga
	}
}

export { IdSelectEspelhoCargaUseCase }
