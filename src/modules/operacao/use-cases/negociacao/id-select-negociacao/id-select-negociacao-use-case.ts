import { inject, injectable } from "tsyringe"
import { INegociacaoRepository } from '@modules/operacao/repositories/i-negociacao-repository'
import { HttpResponse } from '@shared/helpers/http'

@injectable()
class IdSelectNegociacaoUseCase {
  constructor(@inject('NegociacaoRepository')
    private negociacaoRepository: INegociacaoRepository
  ) {}

  async execute({ id }): Promise<HttpResponse> {
    const negociacao = await this.negociacaoRepository.idSelect(id)

    return negociacao
  }
}

export { IdSelectNegociacaoUseCase }
