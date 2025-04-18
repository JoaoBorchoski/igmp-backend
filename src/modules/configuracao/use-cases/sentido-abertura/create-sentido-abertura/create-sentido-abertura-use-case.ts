import { inject, injectable } from 'tsyringe'
import { SentidoAbertura } from '@modules/configuracao/infra/typeorm/entities/sentido-abertura'
import { ISentidoAberturaRepository } from '@modules/configuracao/repositories/i-sentido-abertura-repository'
import { AppError } from '@shared/errors/app-error'

interface IRequest {
  nome: string
  descricao: string
}

@injectable()
class CreateSentidoAberturaUseCase {
  constructor(@inject('SentidoAberturaRepository')
    private sentidoAberturaRepository: ISentidoAberturaRepository
  ) {}

  async execute({
    nome,
    descricao
  }: IRequest): Promise<SentidoAbertura> {
    const result = await this.sentidoAberturaRepository.create({
        nome,
        descricao
      })
      .then(sentidoAberturaResult => {
        return sentidoAberturaResult
      })
      .catch(error => {
        return error
      })

    return result
  }
}

export { CreateSentidoAberturaUseCase }
