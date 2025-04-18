import { inject, injectable } from 'tsyringe'
import { TipoPorta } from '@modules/configuracao/infra/typeorm/entities/tipo-porta'
import { ITipoPortaRepository } from '@modules/configuracao/repositories/i-tipo-porta-repository'
import { HttpResponse } from '@shared/helpers'

@injectable()
class GetTipoPortaUseCase {
  constructor(@inject('TipoPortaRepository')
    private tipoPortaRepository: ITipoPortaRepository
  ) {}

  async execute(id: string): Promise<HttpResponse> {
    const tipoPorta = await this.tipoPortaRepository.get(id)

    return tipoPorta
  }
}

export { GetTipoPortaUseCase }
