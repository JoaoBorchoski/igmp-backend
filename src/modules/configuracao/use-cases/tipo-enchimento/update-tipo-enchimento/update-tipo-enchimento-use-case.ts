import { inject, injectable } from 'tsyringe'
import { TipoEnchimento } from '@modules/configuracao/infra/typeorm/entities/tipo-enchimento'
import { ITipoEnchimentoRepository } from '@modules/configuracao/repositories/i-tipo-enchimento-repository'
import { AppError } from '@shared/errors/app-error'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  id: string
  nome: string
  descricao: string
}

@injectable()
class UpdateTipoEnchimentoUseCase {
  constructor(@inject('TipoEnchimentoRepository')
    private tipoEnchimentoRepository: ITipoEnchimentoRepository
  ) {}

  async execute({
    id,
    nome,
    descricao
  }: IRequest): Promise<HttpResponse> {
    const tipoEnchimento = await this.tipoEnchimentoRepository.update({
      id,
      nome,
      descricao
    })

    return tipoEnchimento
  }
}

export { UpdateTipoEnchimentoUseCase }
