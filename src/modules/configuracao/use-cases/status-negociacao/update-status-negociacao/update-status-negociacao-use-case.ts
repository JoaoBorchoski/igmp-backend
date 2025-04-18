import { inject, injectable } from 'tsyringe'
import { StatusNegociacao } from '@modules/configuracao/infra/typeorm/entities/status-negociacao'
import { IStatusNegociacaoRepository } from '@modules/configuracao/repositories/i-status-negociacao-repository'
import { AppError } from '@shared/errors/app-error'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  id: string
  nome: string
  descricao: string
}

@injectable()
class UpdateStatusNegociacaoUseCase {
  constructor(@inject('StatusNegociacaoRepository')
    private statusNegociacaoRepository: IStatusNegociacaoRepository
  ) {}

  async execute({
    id,
    nome,
    descricao
  }: IRequest): Promise<HttpResponse> {
    const statusNegociacao = await this.statusNegociacaoRepository.update({
      id,
      nome,
      descricao
    })

    return statusNegociacao
  }
}

export { UpdateStatusNegociacaoUseCase }
