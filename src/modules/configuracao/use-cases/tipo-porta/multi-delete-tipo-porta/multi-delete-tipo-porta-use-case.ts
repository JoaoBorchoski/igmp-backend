import { inject, injectable } from 'tsyringe'
import { ITipoPortaRepository } from '@modules/configuracao/repositories/i-tipo-porta-repository';
import { HttpResponse } from '@shared/helpers';

@injectable()
class MultiDeleteTipoPortaUseCase {
  constructor(@inject('TipoPortaRepository')
    private tipoPortaRepository: ITipoPortaRepository
  ) {}

  async execute(ids: string[]): Promise<HttpResponse> {
    const tipoPorta = await this.tipoPortaRepository.multiDelete(ids)

    return tipoPorta
  }
}

export { MultiDeleteTipoPortaUseCase }
