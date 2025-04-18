import { inject, injectable } from 'tsyringe'
import { StatusNegociacao } from '@modules/configuracao/infra/typeorm/entities/status-negociacao'
import { IStatusNegociacaoRepository } from '@modules/configuracao/repositories/i-status-negociacao-repository'
import { HttpResponse } from '@shared/helpers'

@injectable()
class DeleteStatusNegociacaoUseCase {
  constructor(@inject('StatusNegociacaoRepository')
    private statusNegociacaoRepository: IStatusNegociacaoRepository
  ) {}

  async execute(id: string): Promise<HttpResponse> {
    const statusNegociacao = await this.statusNegociacaoRepository.delete(id)

    return statusNegociacao
  }
}

export { DeleteStatusNegociacaoUseCase }
