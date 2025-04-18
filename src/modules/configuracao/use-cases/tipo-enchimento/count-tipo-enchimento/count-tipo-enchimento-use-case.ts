import { inject, injectable } from 'tsyringe'
import { TipoEnchimento } from '@modules/configuracao/infra/typeorm/entities/tipo-enchimento'
import { ITipoEnchimentoRepository } from '@modules/configuracao/repositories/i-tipo-enchimento-repository'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  search: string,
  filter?: string
}

@injectable()
class CountTipoEnchimentoUseCase {
  constructor(@inject('TipoEnchimentoRepository')
    private tipoEnchimentoRepository: ITipoEnchimentoRepository
  ) {}

  async execute({
    search,
    filter
  }: IRequest): Promise<HttpResponse> {
    const tiposEnchimentoCount = await this.tipoEnchimentoRepository.count(
      search,
      filter
    )

    return tiposEnchimentoCount
  }
}

export { CountTipoEnchimentoUseCase }
