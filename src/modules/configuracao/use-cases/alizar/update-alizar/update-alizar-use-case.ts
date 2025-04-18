import { inject, injectable } from 'tsyringe'
import { Alizar } from '@modules/configuracao/infra/typeorm/entities/alizar'
import { IAlizarRepository } from '@modules/configuracao/repositories/i-alizar-repository'
import { AppError } from '@shared/errors/app-error'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  id: string
  nome: string
  descricao: string
}

@injectable()
class UpdateAlizarUseCase {
  constructor(@inject('AlizarRepository')
    private alizarRepository: IAlizarRepository
  ) {}

  async execute({
    id,
    nome,
    descricao
  }: IRequest): Promise<HttpResponse> {
    const alizar = await this.alizarRepository.update({
      id,
      nome,
      descricao
    })

    return alizar
  }
}

export { UpdateAlizarUseCase }
