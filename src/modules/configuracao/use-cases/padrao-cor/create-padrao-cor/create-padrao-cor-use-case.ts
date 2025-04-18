import { inject, injectable } from 'tsyringe'
import { PadraoCor } from '@modules/configuracao/infra/typeorm/entities/padrao-cor'
import { IPadraoCorRepository } from '@modules/configuracao/repositories/i-padrao-cor-repository'
import { AppError } from '@shared/errors/app-error'

interface IRequest {
  nome: string
  descricao: string
}

@injectable()
class CreatePadraoCorUseCase {
  constructor(@inject('PadraoCorRepository')
    private padraoCorRepository: IPadraoCorRepository
  ) {}

  async execute({
    nome,
    descricao
  }: IRequest): Promise<PadraoCor> {
    const result = await this.padraoCorRepository.create({
        nome,
        descricao
      })
      .then(padraoCorResult => {
        return padraoCorResult
      })
      .catch(error => {
        return error
      })

    return result
  }
}

export { CreatePadraoCorUseCase }
