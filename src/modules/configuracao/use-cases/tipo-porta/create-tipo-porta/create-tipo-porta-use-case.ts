import { inject, injectable } from 'tsyringe'
import { TipoPorta } from '@modules/configuracao/infra/typeorm/entities/tipo-porta'
import { ITipoPortaRepository } from '@modules/configuracao/repositories/i-tipo-porta-repository'
import { AppError } from '@shared/errors/app-error'

interface IRequest {
  nome: string
  descricao: string
}

@injectable()
class CreateTipoPortaUseCase {
  constructor(@inject('TipoPortaRepository')
    private tipoPortaRepository: ITipoPortaRepository
  ) {}

  async execute({
    nome,
    descricao
  }: IRequest): Promise<TipoPorta> {
    const result = await this.tipoPortaRepository.create({
        nome,
        descricao
      })
      .then(tipoPortaResult => {
        return tipoPortaResult
      })
      .catch(error => {
        return error
      })

    return result
  }
}

export { CreateTipoPortaUseCase }
