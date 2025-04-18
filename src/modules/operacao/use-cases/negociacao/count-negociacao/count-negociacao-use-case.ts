import { inject, injectable } from 'tsyringe'
import { Negociacao } from '@modules/operacao/infra/typeorm/entities/negociacao'
import { INegociacaoRepository } from '@modules/operacao/repositories/i-negociacao-repository'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  search: string,
  filter?: string
}

@injectable()
class CountNegociacaoUseCase {
  constructor(@inject('NegociacaoRepository')
    private negociacaoRepository: INegociacaoRepository
  ) {}

  async execute({
    search,
    filter
  }: IRequest): Promise<HttpResponse> {
    const negociacoesCount = await this.negociacaoRepository.count(
      search,
      filter
    )

    return negociacoesCount
  }
}

export { CountNegociacaoUseCase }
