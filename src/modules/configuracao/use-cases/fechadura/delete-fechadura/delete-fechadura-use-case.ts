import { inject, injectable } from 'tsyringe'
import { Fechadura } from '@modules/configuracao/infra/typeorm/entities/fechadura'
import { IFechaduraRepository } from '@modules/configuracao/repositories/i-fechadura-repository'
import { HttpResponse } from '@shared/helpers'

@injectable()
class DeleteFechaduraUseCase {
  constructor(@inject('FechaduraRepository')
    private fechaduraRepository: IFechaduraRepository
  ) {}

  async execute(id: string): Promise<HttpResponse> {
    const fechadura = await this.fechaduraRepository.delete(id)

    return fechadura
  }
}

export { DeleteFechaduraUseCase }
