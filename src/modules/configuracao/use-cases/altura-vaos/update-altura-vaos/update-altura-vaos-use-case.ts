import { inject, injectable } from 'tsyringe'
import { AlturaVaos } from '@modules/configuracao/infra/typeorm/entities/altura-vaos'
import { IAlturaVaosRepository } from '@modules/configuracao/repositories/i-altura-vaos-repository'
import { AppError } from '@shared/errors/app-error'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  id: string
  nome: string
  descricao: string
}

@injectable()
class UpdateAlturaVaosUseCase {
  constructor(@inject('AlturaVaosRepository')
    private alturaVaosRepository: IAlturaVaosRepository
  ) {}

  async execute({
    id,
    nome,
    descricao
  }: IRequest): Promise<HttpResponse> {
    const alturaVaos = await this.alturaVaosRepository.update({
      id,
      nome,
      descricao
    })

    return alturaVaos
  }
}

export { UpdateAlturaVaosUseCase }
