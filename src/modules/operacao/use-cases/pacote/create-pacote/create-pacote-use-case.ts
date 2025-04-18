import { inject, injectable } from 'tsyringe'
import { Pacote } from '@modules/operacao/infra/typeorm/entities/pacote'
import { IPacoteRepository } from '@modules/operacao/repositories/i-pacote-repository'
import { AppError } from '@shared/errors/app-error'

interface IRequest {
  pedidoId: string
  descricao: string
}

@injectable()
class CreatePacoteUseCase {
  constructor(@inject('PacoteRepository')
    private pacoteRepository: IPacoteRepository
  ) {}

  async execute({
    pedidoId,
    descricao
  }: IRequest): Promise<Pacote> {
    const result = await this.pacoteRepository.create({
        pedidoId,
        descricao
      })
      .then(pacoteResult => {
        return pacoteResult
      })
      .catch(error => {
        return error
      })

    return result
  }
}

export { CreatePacoteUseCase }
