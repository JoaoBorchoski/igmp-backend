import { inject, injectable } from 'tsyringe'
import { AlturaVaos } from '@modules/configuracao/infra/typeorm/entities/altura-vaos'
import { IAlturaVaosRepository } from '@modules/configuracao/repositories/i-altura-vaos-repository'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  search: string,
  filter?: string
}

@injectable()
class CountAlturaVaosUseCase {
  constructor(@inject('AlturaVaosRepository')
    private alturaVaosRepository: IAlturaVaosRepository
  ) {}

  async execute({
    search,
    filter
  }: IRequest): Promise<HttpResponse> {
    const alturasVaosCount = await this.alturaVaosRepository.count(
      search,
      filter
    )

    return alturasVaosCount
  }
}

export { CountAlturaVaosUseCase }
