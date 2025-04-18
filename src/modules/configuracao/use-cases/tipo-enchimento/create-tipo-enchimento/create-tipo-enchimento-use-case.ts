import { inject, injectable } from 'tsyringe'
import { TipoEnchimento } from '@modules/configuracao/infra/typeorm/entities/tipo-enchimento'
import { ITipoEnchimentoRepository } from '@modules/configuracao/repositories/i-tipo-enchimento-repository'
import { AppError } from '@shared/errors/app-error'

interface IRequest {
  nome: string
  descricao: string
}

@injectable()
class CreateTipoEnchimentoUseCase {
  constructor(@inject('TipoEnchimentoRepository')
    private tipoEnchimentoRepository: ITipoEnchimentoRepository
  ) {}

  async execute({
    nome,
    descricao
  }: IRequest): Promise<TipoEnchimento> {
    const result = await this.tipoEnchimentoRepository.create({
        nome,
        descricao
      })
      .then(tipoEnchimentoResult => {
        return tipoEnchimentoResult
      })
      .catch(error => {
        return error
      })

    return result
  }
}

export { CreateTipoEnchimentoUseCase }
