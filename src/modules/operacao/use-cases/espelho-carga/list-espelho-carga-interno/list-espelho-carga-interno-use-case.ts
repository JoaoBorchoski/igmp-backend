import { inject, injectable } from 'tsyringe'
import { IEspelhoCargaRepository } from '@modules/operacao/repositories/i-espelho-carga-repository'
import { IEspelhoCargaDTO } from '@modules/operacao/dtos/i-espelho-carga-dto'

interface IRequest {
	search: string
	page: number
	rowsPerPage: number
	order: string
	filter?: string
}

interface ResponseProps {
	items: IEspelhoCargaDTO[]
	hasNext: boolean
}

@injectable()
class ListEspelhoCargaInternoUseCase {
	constructor(
		@inject('EspelhoCargaRepository')
		private espelhoCargaRepository: IEspelhoCargaRepository
	) {}

	async execute({ search = '', page = 0, rowsPerPage = 50, order = '', filter }: IRequest): Promise<ResponseProps> {
		const newPage = page !== 0 ? page - 1 : 0

		const espelhosCarga = await this.espelhoCargaRepository.listInterno(search, newPage, rowsPerPage, order, filter)

		const countEspelhosCarga = await this.espelhoCargaRepository.countInterno(search, filter)

		const numeroEspelhoCarga = page * rowsPerPage

		const espelhosCargaResponse = {
			items: espelhosCarga.data,
			hasNext: numeroEspelhoCarga < countEspelhosCarga.data.count,
		}

		return espelhosCargaResponse
	}
}

export { ListEspelhoCargaInternoUseCase }
