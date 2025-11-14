import { inject, injectable } from "tsyringe"
import { IEspelhoCargaRepository } from "@modules/operacao/repositories/i-espelho-carga-repository"
import { HttpResponse } from "@shared/helpers"

interface IRequest {
	search: string
	filter?: string
}

@injectable()
class CountEspelhoCargaUseCase {
	constructor(
		@inject("EspelhoCargaRepository")
		private espelhoCargaRepository: IEspelhoCargaRepository
	) {}

	async execute({ search, filter }: IRequest): Promise<HttpResponse> {
		const espelhosCargaCount = await this.espelhoCargaRepository.count(search, filter)

		return espelhosCargaCount
	}
}

export { CountEspelhoCargaUseCase }
