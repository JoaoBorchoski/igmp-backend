import { inject, injectable } from "tsyringe"
import { IEspelhoCargaRepository } from "@modules/operacao/repositories/i-espelho-carga-repository"
import { HttpResponse, serverError } from "@shared/helpers"
import { getConnection } from "typeorm"
import { IEspelhoCargaItemsRepository } from "@modules/operacao/repositories/i-espelho-carga-items-repository"

@injectable()
class DeleteEspelhoCargaUseCase {
	constructor(
		@inject("EspelhoCargaRepository")
		private espelhoCargaRepository: IEspelhoCargaRepository,
		@inject("EspelhoCargaItemsRepository")
		private espelhoCargaItemsRepository: IEspelhoCargaItemsRepository
	) {}

	async execute(id: string): Promise<HttpResponse> {
		const queryRunner = getConnection().createQueryRunner()
		await queryRunner.startTransaction()

		try {
			await this.espelhoCargaItemsRepository.deleteByEspelhoCargaIdWithQueryRunner(id, queryRunner.manager)
			const result = await this.espelhoCargaRepository.deleteWithQueryRunner(id, queryRunner.manager)

			await queryRunner.commitTransaction()
			return result
		} catch (error) {
			await queryRunner.rollbackTransaction()
			console.log("Error deleting espelho_carga:", error)
			return serverError(error)
		} finally {
			await queryRunner.release()
		}
	}
}

export { DeleteEspelhoCargaUseCase }
