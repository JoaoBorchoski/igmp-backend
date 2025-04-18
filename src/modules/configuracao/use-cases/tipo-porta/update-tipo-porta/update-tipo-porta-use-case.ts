import { inject, injectable } from 'tsyringe'
import { TipoPorta } from '@modules/configuracao/infra/typeorm/entities/tipo-porta'
import { ITipoPortaRepository } from '@modules/configuracao/repositories/i-tipo-porta-repository'
import { AppError } from '@shared/errors/app-error'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  id: string
  nome: string
  descricao: string
}

@injectable()
class UpdateTipoPortaUseCase {
  constructor(@inject('TipoPortaRepository')
    private tipoPortaRepository: ITipoPortaRepository
  ) {}

  async execute({
    id,
    nome,
    descricao
  }: IRequest): Promise<HttpResponse> {
    const tipoPorta = await this.tipoPortaRepository.update({
      id,
      nome,
      descricao
    })

    return tipoPorta
  }
}

export { UpdateTipoPortaUseCase }
