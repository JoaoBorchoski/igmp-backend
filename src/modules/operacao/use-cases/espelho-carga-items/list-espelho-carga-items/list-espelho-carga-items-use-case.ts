import { inject, injectable } from "tsyringe"
import { IEspelhoCargaItemsRepository } from "@modules/operacao/repositories/i-espelho-carga-items-repository"
import { IEspelhoCargaItemsDTO } from "@modules/operacao/dtos/i-espelho-carga-items-dto"

interface IRequest {
	search: string
	page: number
	rowsPerPage: number
	order: string
	filter?: string
}

interface ResponseProps {
	items: IEspelhoCargaItemsDTO[]
	hasNext: boolean
}

@injectable()
class ListEspelhoCargaItemsUseCase {
	constructor(
		@inject("EspelhoCargaItemsRepository")
		private espelhoCargaItemsRepository: IEspelhoCargaItemsRepository
	) {}

	async execute({ search = "", page = 0, rowsPerPage = 50, order = "", filter }: IRequest): Promise<ResponseProps> {
		const newPage = page !== 0 ? page - 1 : 0

		const espelhosCargaItems = await this.espelhoCargaItemsRepository.list(
			search,
			newPage,
			rowsPerPage,
			order,
			filter
		)

		const countEspelhosCargaItems = await this.espelhoCargaItemsRepository.count(search, filter)

		const numeroEspelhoCargaItems = page * rowsPerPage

		const espelhosCargaItemsResponse = {
			items: espelhosCargaItems.data,
			hasNext: numeroEspelhoCargaItems < countEspelhosCargaItems.data.count,
		}

		return espelhosCargaItemsResponse
	}
}

export { ListEspelhoCargaItemsUseCase }
