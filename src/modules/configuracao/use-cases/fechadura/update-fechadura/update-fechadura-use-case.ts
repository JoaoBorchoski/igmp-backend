import { inject, injectable } from 'tsyringe'
import { Fechadura } from '@modules/configuracao/infra/typeorm/entities/fechadura'
import { IFechaduraRepository } from '@modules/configuracao/repositories/i-fechadura-repository'
import { AppError } from '@shared/errors/app-error'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  id: string
  nome: string
  descricao: string
}

@injectable()
class UpdateFechaduraUseCase {
  constructor(@inject('FechaduraRepository')
    private fechaduraRepository: IFechaduraRepository
  ) {}

  async execute({
    id,
    nome,
    descricao
  }: IRequest): Promise<HttpResponse> {
    const fechadura = await this.fechaduraRepository.update({
      id,
      nome,
      descricao
    })

    return fechadura
  }
}

export { UpdateFechaduraUseCase }
