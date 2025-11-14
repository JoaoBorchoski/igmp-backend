import { inject, injectable } from "tsyringe"
import { IEspelhoCargaItemsRepository } from "@modules/operacao/repositories/i-espelho-carga-items-repository"
import { HttpResponse } from "@shared/helpers"

interface IRequest {
	search: string
	filter?: string
}

@injectable()
class CountEspelhoCargaItemsUseCase {
	constructor(
		@inject("EspelhoCargaItemsRepository")
		private espelhoCargaItemsRepository: IEspelhoCargaItemsRepository
	) {}

	async execute({ search, filter }: IRequest): Promise<HttpResponse> {
		const espelhosCargaItemsCount = await this.espelhoCargaItemsRepository.count(search, filter)

		return espelhosCargaItemsCount
	}
}

export { CountEspelhoCargaItemsUseCase }
