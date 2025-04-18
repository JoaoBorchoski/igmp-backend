import { inject, injectable } from 'tsyringe'
import { Cep } from '@modules/comum/infra/typeorm/entities/cep'
import { ICepRepository } from '@modules/comum/repositories/i-cep-repository'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  search: string,
  filter?: string
}

@injectable()
class CountCepUseCase {
  constructor(@inject('CepRepository')
    private cepRepository: ICepRepository
  ) {}

  async execute({
    search,
    filter
  }: IRequest): Promise<HttpResponse> {
    const cepsCount = await this.cepRepository.count(
      search,
      filter
    )

    return cepsCount
  }
}

export { CountCepUseCase }
