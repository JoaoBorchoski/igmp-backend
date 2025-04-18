import { inject, injectable } from "tsyringe"
import { IPacoteRepository } from '@modules/operacao/repositories/i-pacote-repository'
import { HttpResponse } from '@shared/helpers/http'

@injectable()
class IdSelectPacoteUseCase {
  constructor(@inject('PacoteRepository')
    private pacoteRepository: IPacoteRepository
  ) {}

  async execute({ id }): Promise<HttpResponse> {
    const pacote = await this.pacoteRepository.idSelect(id)

    return pacote
  }
}

export { IdSelectPacoteUseCase }
