import { inject, injectable } from 'tsyringe'
import { ITipoEnchimentoRepository } from '@modules/configuracao/repositories/i-tipo-enchimento-repository';
import { HttpResponse } from '@shared/helpers';

@injectable()
class MultiDeleteTipoEnchimentoUseCase {
  constructor(@inject('TipoEnchimentoRepository')
    private tipoEnchimentoRepository: ITipoEnchimentoRepository
  ) {}

  async execute(ids: string[]): Promise<HttpResponse> {
    const tipoEnchimento = await this.tipoEnchimentoRepository.multiDelete(ids)

    return tipoEnchimento
  }
}

export { MultiDeleteTipoEnchimentoUseCase }
