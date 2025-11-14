import { inject, injectable } from "tsyringe"
import { IEspelhoCargaItemsRepository } from "@modules/operacao/repositories/i-espelho-carga-items-repository"
import { HttpResponse } from "@shared/helpers"

interface IRequest {
	id: string
	espelhoCargaId: string
	pacoteItemId: string
	quantidade: number
}

@injectable()
class UpdateEspelhoCargaItemsUseCase {
	constructor(
		@inject("EspelhoCargaItemsRepository")
		private espelhoCargaItemsRepository: IEspelhoCargaItemsRepository
	) {}

	async execute({ id, espelhoCargaId, pacoteItemId, quantidade }: IRequest): Promise<HttpResponse> {
		const result = await this.espelhoCargaItemsRepository
			.update({
				id,
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

export { UpdateEspelhoCargaItemsUseCase }
