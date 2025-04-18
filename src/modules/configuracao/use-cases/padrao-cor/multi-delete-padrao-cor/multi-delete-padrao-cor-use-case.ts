import { inject, injectable } from 'tsyringe'
import { IPadraoCorRepository } from '@modules/configuracao/repositories/i-padrao-cor-repository';
import { HttpResponse } from '@shared/helpers';

@injectable()
class MultiDeletePadraoCorUseCase {
  constructor(@inject('PadraoCorRepository')
    private padraoCorRepository: IPadraoCorRepository
  ) {}

  async execute(ids: string[]): Promise<HttpResponse> {
    const padraoCor = await this.padraoCorRepository.multiDelete(ids)

    return padraoCor
  }
}

export { MultiDeletePadraoCorUseCase }
