import { inject, injectable } from "tsyringe"
import { IEspelhoCargaItemsRepository } from "@modules/operacao/repositories/i-espelho-carga-items-repository"
import { HttpResponse } from "@shared/helpers/http"

@injectable()
class IdSelectEspelhoCargaItemsUseCase {
	constructor(
		@inject("EspelhoCargaItemsRepository")
		private espelhoCargaItemsRepository: IEspelhoCargaItemsRepository
	) {}

	async execute({ id }): Promise<HttpResponse> {
		const espelhoCargaItems = await this.espelhoCargaItemsRepository.idSelect(id)

		return espelhoCargaItems
	}
}

export { IdSelectEspelhoCargaItemsUseCase }
