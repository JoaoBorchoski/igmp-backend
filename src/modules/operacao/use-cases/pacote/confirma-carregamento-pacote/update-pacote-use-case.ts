import { inject, injectable } from "tsyringe"
import { Pacote } from "@modules/operacao/infra/typeorm/entities/pacote"
import { IPacoteRepository } from "@modules/operacao/repositories/i-pacote-repository"
import { AppError } from "@shared/errors/app-error"
import { HttpResponse } from "@shared/helpers"

interface IRequest {
    id: string
}

@injectable()
class ConfirmaCarregamentoPacoteUseCase {
    constructor(
        @inject("PacoteRepository")
        private pacoteRepository: IPacoteRepository
    ) {}

    async execute({ id }: IRequest): Promise<HttpResponse> {
        const pacote = await this.pacoteRepository.updatePacoteItemStatus(id)

        return pacote
    }
}

export { ConfirmaCarregamentoPacoteUseCase }
