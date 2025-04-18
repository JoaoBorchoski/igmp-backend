import { inject, injectable } from "tsyringe"
import { IFechaduraRepository } from '@modules/configuracao/repositories/i-fechadura-repository'
import { HttpResponse } from '@shared/helpers/http'

@injectable()
class IdSelectFechaduraUseCase {
  constructor(@inject('FechaduraRepository')
    private fechaduraRepository: IFechaduraRepository
  ) {}

  async execute({ id }): Promise<HttpResponse> {
    const fechadura = await this.fechaduraRepository.idSelect(id)

    return fechadura
  }
}

export { IdSelectFechaduraUseCase }
