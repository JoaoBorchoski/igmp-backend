import { inject, injectable } from 'tsyringe'
import { Alizar } from '@modules/configuracao/infra/typeorm/entities/alizar'
import { IAlizarRepository } from '@modules/configuracao/repositories/i-alizar-repository'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  search: string,
  filter?: string
}

@injectable()
class CountAlizarUseCase {
  constructor(@inject('AlizarRepository')
    private alizarRepository: IAlizarRepository
  ) {}

  async execute({
    search,
    filter
  }: IRequest): Promise<HttpResponse> {
    const alizaresCount = await this.alizarRepository.count(
      search,
      filter
    )

    return alizaresCount
  }
}

export { CountAlizarUseCase }
