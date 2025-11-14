import { inject, injectable } from "tsyringe"
import { IEspelhoCargaItemsRepository } from "@modules/operacao/repositories/i-espelho-carga-items-repository"
import { HttpResponse } from "@shared/helpers"

@injectable()
class GetEspelhoCargaItemsUseCase {
	constructor(
		@inject("EspelhoCargaItemsRepository")
		private espelhoCargaItemsRepository: IEspelhoCargaItemsRepository
	) {}

	async execute(id: string): Promise<HttpResponse> {
		const espelhoCargaItems = await this.espelhoCargaItemsRepository.get(id)

		return espelhoCargaItems
	}
}

export { GetEspelhoCargaItemsUseCase }
