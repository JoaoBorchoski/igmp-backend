import { inject, injectable } from 'tsyringe'
import { LarguraVaos } from '@modules/configuracao/infra/typeorm/entities/largura-vaos'
import { ILarguraVaosRepository } from '@modules/configuracao/repositories/i-largura-vaos-repository'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  search: string,
  filter?: string
}

@injectable()
class CountLarguraVaosUseCase {
  constructor(@inject('LarguraVaosRepository')
    private larguraVaosRepository: ILarguraVaosRepository
  ) {}

  async execute({
    search,
    filter
  }: IRequest): Promise<HttpResponse> {
    const largurasVaosCount = await this.larguraVaosRepository.count(
      search,
      filter
    )

    return largurasVaosCount
  }
}

export { CountLarguraVaosUseCase }
