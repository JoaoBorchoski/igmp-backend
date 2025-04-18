import { inject, injectable } from 'tsyringe'
import { PadraoCor } from '@modules/configuracao/infra/typeorm/entities/padrao-cor'
import { IPadraoCorRepository } from '@modules/configuracao/repositories/i-padrao-cor-repository'
import { HttpResponse } from '@shared/helpers'

@injectable()
class GetPadraoCorUseCase {
  constructor(@inject('PadraoCorRepository')
    private padraoCorRepository: IPadraoCorRepository
  ) {}

  async execute(id: string): Promise<HttpResponse> {
    const padraoCor = await this.padraoCorRepository.get(id)

    return padraoCor
  }
}

export { GetPadraoCorUseCase }
