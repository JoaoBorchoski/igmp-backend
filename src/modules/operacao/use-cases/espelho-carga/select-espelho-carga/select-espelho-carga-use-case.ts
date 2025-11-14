import { inject, injectable } from "tsyringe"
import { IEspelhoCargaRepository } from "@modules/operacao/repositories/i-espelho-carga-repository"

interface ResponseProps {
	items?: object[]
	hasNext?: boolean
	value?: string
	label?: string
}

@injectable()
class SelectEspelhoCargaUseCase {
	constructor(
		@inject("EspelhoCargaRepository")
		private espelhoCargaRepository: IEspelhoCargaRepository
	) {}

	async execute({ filter }): Promise<ResponseProps> {
		const espelhosCarga = await this.espelhoCargaRepository.select(filter)

		const newEspelhosCarga = {
			items: espelhosCarga.data,
			hasNext: false,
		}

		return newEspelhosCarga
	}
}

export { SelectEspelhoCargaUseCase }
