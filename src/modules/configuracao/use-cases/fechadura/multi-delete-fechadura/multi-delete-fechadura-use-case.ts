import { inject, injectable } from 'tsyringe'
import { IFechaduraRepository } from '@modules/configuracao/repositories/i-fechadura-repository';
import { HttpResponse } from '@shared/helpers';

@injectable()
class MultiDeleteFechaduraUseCase {
  constructor(@inject('FechaduraRepository')
    private fechaduraRepository: IFechaduraRepository
  ) {}

  async execute(ids: string[]): Promise<HttpResponse> {
    const fechadura = await this.fechaduraRepository.multiDelete(ids)

    return fechadura
  }
}

export { MultiDeleteFechaduraUseCase }
