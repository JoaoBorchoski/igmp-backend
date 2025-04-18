import { inject, injectable } from 'tsyringe'
import { LarguraVaos } from '@modules/configuracao/infra/typeorm/entities/largura-vaos'
import { ILarguraVaosRepository } from '@modules/configuracao/repositories/i-largura-vaos-repository'
import { AppError } from '@shared/errors/app-error'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  id: string
  nome: string
  descricao: string
}

@injectable()
class UpdateLarguraVaosUseCase {
  constructor(@inject('LarguraVaosRepository')
    private larguraVaosRepository: ILarguraVaosRepository
  ) {}

  async execute({
    id,
    nome,
    descricao
  }: IRequest): Promise<HttpResponse> {
    const larguraVaos = await this.larguraVaosRepository.update({
      id,
      nome,
      descricao
    })

    return larguraVaos
  }
}

export { UpdateLarguraVaosUseCase }
