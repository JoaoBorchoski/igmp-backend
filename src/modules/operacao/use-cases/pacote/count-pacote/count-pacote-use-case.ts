import { inject, injectable } from 'tsyringe'
import { Pacote } from '@modules/operacao/infra/typeorm/entities/pacote'
import { IPacoteRepository } from '@modules/operacao/repositories/i-pacote-repository'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  search: string,
  filter?: string
}

@injectable()
class CountPacoteUseCase {
  constructor(@inject('PacoteRepository')
    private pacoteRepository: IPacoteRepository
  ) {}

  async execute({
    search,
    filter
  }: IRequest): Promise<HttpResponse> {
    const pacotesCount = await this.pacoteRepository.count(
      search,
      filter
    )

    return pacotesCount
  }
}

export { CountPacoteUseCase }
