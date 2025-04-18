import { inject, injectable } from 'tsyringe'
import { StatusNegociacao } from '@modules/configuracao/infra/typeorm/entities/status-negociacao'
import { IStatusNegociacaoRepository } from '@modules/configuracao/repositories/i-status-negociacao-repository'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  search: string,
  filter?: string
}

@injectable()
class CountStatusNegociacaoUseCase {
  constructor(@inject('StatusNegociacaoRepository')
    private statusNegociacaoRepository: IStatusNegociacaoRepository
  ) {}

  async execute({
    search,
    filter
  }: IRequest): Promise<HttpResponse> {
    const statusNegociacoesCount = await this.statusNegociacaoRepository.count(
      search,
      filter
    )

    return statusNegociacoesCount
  }
}

export { CountStatusNegociacaoUseCase }
