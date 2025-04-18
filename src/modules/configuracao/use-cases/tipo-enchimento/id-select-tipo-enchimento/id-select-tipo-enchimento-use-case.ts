import { inject, injectable } from "tsyringe"
import { ITipoEnchimentoRepository } from '@modules/configuracao/repositories/i-tipo-enchimento-repository'
import { HttpResponse } from '@shared/helpers/http'

@injectable()
class IdSelectTipoEnchimentoUseCase {
  constructor(@inject('TipoEnchimentoRepository')
    private tipoEnchimentoRepository: ITipoEnchimentoRepository
  ) {}

  async execute({ id }): Promise<HttpResponse> {
    const tipoEnchimento = await this.tipoEnchimentoRepository.idSelect(id)

    return tipoEnchimento
  }
}

export { IdSelectTipoEnchimentoUseCase }
