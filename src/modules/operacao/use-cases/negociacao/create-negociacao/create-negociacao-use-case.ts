import { inject, injectable } from 'tsyringe'
import { Negociacao } from '@modules/operacao/infra/typeorm/entities/negociacao'
import { INegociacaoRepository } from '@modules/operacao/repositories/i-negociacao-repository'
import { AppError } from '@shared/errors/app-error'

interface IRequest {
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
class CreateNegociacaoUseCase {
  constructor(@inject('NegociacaoRepository')
    private negociacaoRepository: INegociacaoRepository
  ) {}

  async execute({
    medicaoId,
    clienteId,
    statusNegociacaoId,
    funcionarioId,
    dataCriacao,
    dataFechamento,
    valorEstimado,
    descricao,
    motivoPerda
  }: IRequest): Promise<Negociacao> {
    const result = await this.negociacaoRepository.create({
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
      .then(negociacaoResult => {
        return negociacaoResult
      })
      .catch(error => {
        return error
      })

    return result
  }
}

export { CreateNegociacaoUseCase }
