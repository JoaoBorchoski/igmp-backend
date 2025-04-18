import { inject, injectable } from 'tsyringe'
import { Alizar } from '@modules/configuracao/infra/typeorm/entities/alizar'
import { IAlizarRepository } from '@modules/configuracao/repositories/i-alizar-repository'
import { AppError } from '@shared/errors/app-error'

interface IRequest {
  nome: string
  descricao: string
}

@injectable()
class CreateAlizarUseCase {
  constructor(@inject('AlizarRepository')
    private alizarRepository: IAlizarRepository
  ) {}

  async execute({
    nome,
    descricao
  }: IRequest): Promise<Alizar> {
    const result = await this.alizarRepository.create({
        nome,
        descricao
      })
      .then(alizarResult => {
        return alizarResult
      })
      .catch(error => {
        return error
      })

    return result
  }
}

export { CreateAlizarUseCase }
