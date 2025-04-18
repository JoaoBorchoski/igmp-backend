import { inject, injectable } from 'tsyringe'
import { Negociacao } from '@modules/operacao/infra/typeorm/entities/negociacao'
import { INegociacaoRepository } from '@modules/operacao/repositories/i-negociacao-repository'
import { HttpResponse } from '@shared/helpers'

@injectable()
class DeleteNegociacaoUseCase {
  constructor(@inject('NegociacaoRepository')
    private negociacaoRepository: INegociacaoRepository
  ) {}

  async execute(id: string): Promise<HttpResponse> {
    const negociacao = await this.negociacaoRepository.delete(id)

    return negociacao
  }
}

export { DeleteNegociacaoUseCase }
