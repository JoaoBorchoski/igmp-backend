import { inject, injectable } from 'tsyringe'
import { IStatusNegociacaoRepository } from '@modules/configuracao/repositories/i-status-negociacao-repository';
import { HttpResponse } from '@shared/helpers';

@injectable()
class MultiDeleteStatusNegociacaoUseCase {
  constructor(@inject('StatusNegociacaoRepository')
    private statusNegociacaoRepository: IStatusNegociacaoRepository
  ) {}

  async execute(ids: string[]): Promise<HttpResponse> {
    const statusNegociacao = await this.statusNegociacaoRepository.multiDelete(ids)

    return statusNegociacao
  }
}

export { MultiDeleteStatusNegociacaoUseCase }
