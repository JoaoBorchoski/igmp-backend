import { inject, injectable } from 'tsyringe'
import { PadraoCor } from '@modules/configuracao/infra/typeorm/entities/padrao-cor'
import { IPadraoCorRepository } from '@modules/configuracao/repositories/i-padrao-cor-repository'
import { HttpResponse } from '@shared/helpers'

@injectable()
class DeletePadraoCorUseCase {
  constructor(@inject('PadraoCorRepository')
    private padraoCorRepository: IPadraoCorRepository
  ) {}

  async execute(id: string): Promise<HttpResponse> {
    const padraoCor = await this.padraoCorRepository.delete(id)

    return padraoCor
  }
}

export { DeletePadraoCorUseCase }
