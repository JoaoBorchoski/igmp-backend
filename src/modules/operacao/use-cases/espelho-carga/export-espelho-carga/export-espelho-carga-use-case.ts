import { inject, injectable } from "tsyringe"
import { IEspelhoCargaRepository } from "@modules/operacao/repositories/i-espelho-carga-repository"
import { HttpResponse } from "@shared/helpers"

@injectable()
class ExportEspelhoCargaUseCase {
	constructor(
		@inject("EspelhoCargaRepository")
		private espelhoCargaRepository: IEspelhoCargaRepository
	) {}

	async execute(id: string): Promise<HttpResponse> {
		const espelhoCarga = await this.espelhoCargaRepository.get(id)

		console.log("espelhoCarga", espelhoCarga)
		for await (const item of espelhoCarga.data.espelhoCargaItems) {
			console.log("item", item)
			console.log("item.items", item.items)
		}

		return espelhoCarga
	}
}

export { ExportEspelhoCargaUseCase }
