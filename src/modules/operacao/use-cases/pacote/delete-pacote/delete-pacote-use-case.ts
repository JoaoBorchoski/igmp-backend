import { inject, injectable } from 'tsyringe'
import { Pacote } from '@modules/operacao/infra/typeorm/entities/pacote'
import { IPacoteRepository } from '@modules/operacao/repositories/i-pacote-repository'
import { conflictError, HttpResponse } from '@shared/helpers'
import { IEspelhoCargaItemsRepository } from '@modules/operacao/repositories/i-espelho-carga-items-repository'

@injectable()
class DeletePacoteUseCase {
	constructor(
		@inject('PacoteRepository')
		private pacoteRepository: IPacoteRepository,
		@inject('EspelhoCargaItemsRepository')
		private espelhoCargaItemsRepository: IEspelhoCargaItemsRepository,
	) {}

	async execute(id: string): Promise<HttpResponse> {
		const alreadyHasEspelhoCarga = await this.espelhoCargaItemsRepository.getByPacoteItemId(id)

		if (alreadyHasEspelhoCarga.statusCode === 200) {
			return conflictError('Pacote já tem espelho de carga')
		}

		const pacote = await this.pacoteRepository.delete(id)

		return pacote
	}
}

export { DeletePacoteUseCase }
