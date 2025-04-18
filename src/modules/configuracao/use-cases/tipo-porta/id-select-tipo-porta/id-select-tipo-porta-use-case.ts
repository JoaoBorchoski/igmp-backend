import { inject, injectable } from "tsyringe"
import { ITipoPortaRepository } from '@modules/configuracao/repositories/i-tipo-porta-repository'
import { HttpResponse } from '@shared/helpers/http'

@injectable()
class IdSelectTipoPortaUseCase {
  constructor(@inject('TipoPortaRepository')
    private tipoPortaRepository: ITipoPortaRepository
  ) {}

  async execute({ id }): Promise<HttpResponse> {
    const tipoPorta = await this.tipoPortaRepository.idSelect(id)

    return tipoPorta
  }
}

export { IdSelectTipoPortaUseCase }
