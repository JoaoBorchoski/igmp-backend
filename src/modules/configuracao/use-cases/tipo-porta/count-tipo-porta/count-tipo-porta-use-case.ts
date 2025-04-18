import { inject, injectable } from 'tsyringe'
import { TipoPorta } from '@modules/configuracao/infra/typeorm/entities/tipo-porta'
import { ITipoPortaRepository } from '@modules/configuracao/repositories/i-tipo-porta-repository'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  search: string,
  filter?: string
}

@injectable()
class CountTipoPortaUseCase {
  constructor(@inject('TipoPortaRepository')
    private tipoPortaRepository: ITipoPortaRepository
  ) {}

  async execute({
    search,
    filter
  }: IRequest): Promise<HttpResponse> {
    const tiposPortaCount = await this.tipoPortaRepository.count(
      search,
      filter
    )

    return tiposPortaCount
  }
}

export { CountTipoPortaUseCase }
