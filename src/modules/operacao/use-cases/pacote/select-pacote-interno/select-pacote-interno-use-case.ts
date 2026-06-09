import { inject, injectable } from 'tsyringe'
import { IPacoteRepository } from '@modules/operacao/repositories/i-pacote-repository'

interface ResponseProps {
	items?: object[]
	hasNext?: boolean
	value?: string
	label?: string
}

@injectable()
class SelectPacoteInternoUseCase {
	constructor(
		@inject('PacoteRepository')
		private pacoteRepository: IPacoteRepository
	) {}

	async execute({ filter }): Promise<ResponseProps> {
		const pacotes = await this.pacoteRepository.selectInterno(filter)

		const newPacotes = {
			items: pacotes.data,
			hasNext: false,
		}

		return newPacotes
	}
}

export { SelectPacoteInternoUseCase }
