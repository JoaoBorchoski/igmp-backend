import { inject, injectable } from 'tsyringe'
import { TipoEnchimento } from '@modules/configuracao/infra/typeorm/entities/tipo-enchimento'
import { ITipoEnchimentoRepository } from '@modules/configuracao/repositories/i-tipo-enchimento-repository'
import { HttpResponse } from '@shared/helpers'

@injectable()
class GetTipoEnchimentoUseCase {
  constructor(@inject('TipoEnchimentoRepository')
    private tipoEnchimentoRepository: ITipoEnchimentoRepository
  ) {}

  async execute(id: string): Promise<HttpResponse> {
    const tipoEnchimento = await this.tipoEnchimentoRepository.get(id)

    return tipoEnchimento
  }
}

export { GetTipoEnchimentoUseCase }
