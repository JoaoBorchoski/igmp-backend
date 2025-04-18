import { inject, injectable } from "tsyringe"
import { IStatusNegociacaoRepository } from '@modules/configuracao/repositories/i-status-negociacao-repository'
import { HttpResponse } from '@shared/helpers/http'

@injectable()
class IdSelectStatusNegociacaoUseCase {
  constructor(@inject('StatusNegociacaoRepository')
    private statusNegociacaoRepository: IStatusNegociacaoRepository
  ) {}

  async execute({ id }): Promise<HttpResponse> {
    const statusNegociacao = await this.statusNegociacaoRepository.idSelect(id)

    return statusNegociacao
  }
}

export { IdSelectStatusNegociacaoUseCase }
