import { inject, injectable } from "tsyringe"
import { IEspelhoCargaItemsRepository } from "@modules/operacao/repositories/i-espelho-carga-items-repository"

interface ResponseProps {
	items?: object[]
	hasNext?: boolean
	value?: string
	label?: string
}

@injectable()
class SelectEspelhoCargaItemsUseCase {
	constructor(
		@inject("EspelhoCargaItemsRepository")
		private espelhoCargaItemsRepository: IEspelhoCargaItemsRepository
	) {}

	async execute({ filter, espelhoCargaId }): Promise<ResponseProps> {
		let espelhosCargaItems

		if (espelhoCargaId) {
			espelhosCargaItems = await this.espelhoCargaItemsRepository.selectByEspelhoCargaId(filter, espelhoCargaId)
		} else {
			espelhosCargaItems = await this.espelhoCargaItemsRepository.select(filter)
		}

		const newEspelhosCargaItems = {
			items: espelhosCargaItems.data,
			hasNext: false,
		}

		return newEspelhosCargaItems
	}
}

export { SelectEspelhoCargaItemsUseCase }
