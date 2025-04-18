import { inject, injectable } from 'tsyringe'
import { Fechadura } from '@modules/configuracao/infra/typeorm/entities/fechadura'
import { IFechaduraRepository } from '@modules/configuracao/repositories/i-fechadura-repository'
import { AppError } from '@shared/errors/app-error'

interface IRequest {
  nome: string
  descricao: string
}

@injectable()
class CreateFechaduraUseCase {
  constructor(@inject('FechaduraRepository')
    private fechaduraRepository: IFechaduraRepository
  ) {}

  async execute({
    nome,
    descricao
  }: IRequest): Promise<Fechadura> {
    const result = await this.fechaduraRepository.create({
        nome,
        descricao
      })
      .then(fechaduraResult => {
        return fechaduraResult
      })
      .catch(error => {
        return error
      })

    return result
  }
}

export { CreateFechaduraUseCase }
