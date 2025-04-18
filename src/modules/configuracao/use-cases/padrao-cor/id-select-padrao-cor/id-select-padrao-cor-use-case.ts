import { inject, injectable } from "tsyringe"
import { IPadraoCorRepository } from '@modules/configuracao/repositories/i-padrao-cor-repository'
import { HttpResponse } from '@shared/helpers/http'

@injectable()
class IdSelectPadraoCorUseCase {
  constructor(@inject('PadraoCorRepository')
    private padraoCorRepository: IPadraoCorRepository
  ) {}

  async execute({ id }): Promise<HttpResponse> {
    const padraoCor = await this.padraoCorRepository.idSelect(id)

    return padraoCor
  }
}

export { IdSelectPadraoCorUseCase }
