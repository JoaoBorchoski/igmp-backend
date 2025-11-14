import { inject, injectable } from "tsyringe"
import { EspelhoCargaItems } from "@modules/operacao/infra/typeorm/entities/espelho-carga-items"
import { IEspelhoCargaItemsRepository } from "@modules/operacao/repositories/i-espelho-carga-items-repository"
import { HttpResponse } from "@shared/helpers"

interface IRequest {
	espelhoCargaId: string
	pacoteItemId: string
	quantidade: number
}

@injectable()
class CreateEspelhoCargaItemsUseCase {
	constructor(
		@inject("EspelhoCargaItemsRepository")
		private espelhoCargaItemsRepository: IEspelhoCargaItemsRepository
	) {}

	async execute({ espelhoCargaId, pacoteItemId, quantidade }: IRequest): Promise<HttpResponse> {
		const result = await this.espelhoCargaItemsRepository
			.create({
				espelhoCargaId,
				pacoteItemId,
				quantidade,
			})
			.then((espelhoCargaItemsResult) => {
				return espelhoCargaItemsResult
			})
			.catch((error) => {
				return error
			})

		return result
	}
}

export { CreateEspelhoCargaItemsUseCase }
