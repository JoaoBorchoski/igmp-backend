import { inject, injectable } from 'tsyringe'
import { Negociacao } from '@modules/operacao/infra/typeorm/entities/negociacao'
import { INegociacaoRepository } from '@modules/operacao/repositories/i-negociacao-repository'
import { AppError } from '@shared/errors/app-error'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  id: string
  medicaoId: string
  clienteId: string
  statusNegociacaoId: string
  funcionarioId: string
  dataCriacao: Date
  dataFechamento: Date
  valorEstimado: number
  descricao: string
  motivoPerda: string
}

@injectable()
class UpdateNegociacaoUseCase {
  constructor(@inject('NegociacaoRepository')
    private negociacaoRepository: INegociacaoRepository
  ) {}

  async execute({
    id,
    medicaoId,
    clienteId,
    statusNegociacaoId,
    funcionarioId,
    dataCriacao,
    dataFechamento,
    valorEstimado,
    descricao,
    motivoPerda
  }: IRequest): Promise<HttpResponse> {
    const negociacao = await this.negociacaoRepository.update({
      id,
      medicaoId,
      clienteId,
      statusNegociacaoId,
      funcionarioId,
      dataCriacao,
      dataFechamento,
      valorEstimado,
      descricao,
      motivoPerda
    })

    return negociacao
  }
}

export { UpdateNegociacaoUseCase }
