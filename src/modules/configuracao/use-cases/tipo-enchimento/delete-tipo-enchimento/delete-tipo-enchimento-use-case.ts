import { inject, injectable } from 'tsyringe'
import { TipoEnchimento } from '@modules/configuracao/infra/typeorm/entities/tipo-enchimento'
import { ITipoEnchimentoRepository } from '@modules/configuracao/repositories/i-tipo-enchimento-repository'
import { HttpResponse } from '@shared/helpers'

@injectable()
class DeleteTipoEnchimentoUseCase {
  constructor(@inject('TipoEnchimentoRepository')
    private tipoEnchimentoRepository: ITipoEnchimentoRepository
  ) {}

  async execute(id: string): Promise<HttpResponse> {
    const tipoEnchimento = await this.tipoEnchimentoRepository.delete(id)

    return tipoEnchimento
  }
}

export { DeleteTipoEnchimentoUseCase }
