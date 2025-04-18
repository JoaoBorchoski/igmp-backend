import { inject, injectable } from 'tsyringe'
import { Fechadura } from '@modules/configuracao/infra/typeorm/entities/fechadura'
import { IFechaduraRepository } from '@modules/configuracao/repositories/i-fechadura-repository'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  search: string,
  filter?: string
}

@injectable()
class CountFechaduraUseCase {
  constructor(@inject('FechaduraRepository')
    private fechaduraRepository: IFechaduraRepository
  ) {}

  async execute({
    search,
    filter
  }: IRequest): Promise<HttpResponse> {
    const fechadurasCount = await this.fechaduraRepository.count(
      search,
      filter
    )

    return fechadurasCount
  }
}

export { CountFechaduraUseCase }
