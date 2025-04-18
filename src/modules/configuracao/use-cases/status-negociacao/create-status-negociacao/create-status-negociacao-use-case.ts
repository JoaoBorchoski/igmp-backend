import { inject, injectable } from 'tsyringe'
import { StatusNegociacao } from '@modules/configuracao/infra/typeorm/entities/status-negociacao'
import { IStatusNegociacaoRepository } from '@modules/configuracao/repositories/i-status-negociacao-repository'
import { AppError } from '@shared/errors/app-error'

interface IRequest {
  nome: string
  descricao: string
}

@injectable()
class CreateStatusNegociacaoUseCase {
  constructor(@inject('StatusNegociacaoRepository')
    private statusNegociacaoRepository: IStatusNegociacaoRepository
  ) {}

  async execute({
    nome,
    descricao
  }: IRequest): Promise<StatusNegociacao> {
    const result = await this.statusNegociacaoRepository.create({
        nome,
        descricao
      })
      .then(statusNegociacaoResult => {
        return statusNegociacaoResult
      })
      .catch(error => {
        return error
      })

    return result
  }
}

export { CreateStatusNegociacaoUseCase }
