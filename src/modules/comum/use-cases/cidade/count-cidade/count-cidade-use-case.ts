import { inject, injectable } from 'tsyringe'
import { Cidade } from '@modules/comum/infra/typeorm/entities/cidade'
import { ICidadeRepository } from '@modules/comum/repositories/i-cidade-repository'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  search: string,
  filter?: string
}

@injectable()
class CountCidadeUseCase {
  constructor(@inject('CidadeRepository')
    private cidadeRepository: ICidadeRepository
  ) {}

  async execute({
    search,
    filter
  }: IRequest): Promise<HttpResponse> {
    const cidadesCount = await this.cidadeRepository.count(
      search,
      filter
    )

    return cidadesCount
  }
}

export { CountCidadeUseCase }
