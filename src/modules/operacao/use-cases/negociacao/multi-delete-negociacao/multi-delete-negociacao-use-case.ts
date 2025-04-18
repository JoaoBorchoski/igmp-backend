import { inject, injectable } from 'tsyringe'
import { INegociacaoRepository } from '@modules/operacao/repositories/i-negociacao-repository';
import { HttpResponse } from '@shared/helpers';

@injectable()
class MultiDeleteNegociacaoUseCase {
  constructor(@inject('NegociacaoRepository')
    private negociacaoRepository: INegociacaoRepository
  ) {}

  async execute(ids: string[]): Promise<HttpResponse> {
    const negociacao = await this.negociacaoRepository.multiDelete(ids)

    return negociacao
  }
}

export { MultiDeleteNegociacaoUseCase }
