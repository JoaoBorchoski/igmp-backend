import { inject, injectable } from "tsyringe"
import { Pacote } from "@modules/operacao/infra/typeorm/entities/pacote"
import { IPacoteRepository } from "@modules/operacao/repositories/i-pacote-repository"
import { HttpResponse } from "@shared/helpers"

@injectable()
class GetPacoteProdutoInfoUseCase {
    constructor(
        @inject("PacoteRepository")
        private pacoteRepository: IPacoteRepository
    ) {}

    async execute(produtoId: string, pedidoId: string): Promise<HttpResponse> {
        const pacote = await this.pacoteRepository.getProdutoInfo(produtoId, pedidoId)

        return pacote
    }
}

export { GetPacoteProdutoInfoUseCase }
