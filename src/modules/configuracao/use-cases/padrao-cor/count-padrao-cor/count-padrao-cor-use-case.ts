import { inject, injectable } from 'tsyringe'
import { PadraoCor } from '@modules/configuracao/infra/typeorm/entities/padrao-cor'
import { IPadraoCorRepository } from '@modules/configuracao/repositories/i-padrao-cor-repository'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  search: string,
  filter?: string
}

@injectable()
class CountPadraoCorUseCase {
  constructor(@inject('PadraoCorRepository')
    private padraoCorRepository: IPadraoCorRepository
  ) {}

  async execute({
    search,
    filter
  }: IRequest): Promise<HttpResponse> {
    const padroesCoresCount = await this.padraoCorRepository.count(
      search,
      filter
    )

    return padroesCoresCount
  }
}

export { CountPadraoCorUseCase }
