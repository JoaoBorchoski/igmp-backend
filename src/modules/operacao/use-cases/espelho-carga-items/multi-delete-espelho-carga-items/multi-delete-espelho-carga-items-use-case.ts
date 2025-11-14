import { inject, injectable } from "tsyringe"
import { IEspelhoCargaItemsRepository } from "@modules/operacao/repositories/i-espelho-carga-items-repository"
import { HttpResponse } from "@shared/helpers"

@injectable()
class MultiDeleteEspelhoCargaItemsUseCase {
	constructor(
		@inject("EspelhoCargaItemsRepository")
		private espelhoCargaItemsRepository: IEspelhoCargaItemsRepository
	) {}

	async execute(ids: string[]): Promise<HttpResponse> {
		const espelhoCargaItems = await this.espelhoCargaItemsRepository.multiDelete(ids)

		return espelhoCargaItems
	}
}

export { MultiDeleteEspelhoCargaItemsUseCase }
