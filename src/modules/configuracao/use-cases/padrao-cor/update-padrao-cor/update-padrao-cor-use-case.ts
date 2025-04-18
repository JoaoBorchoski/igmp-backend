import { inject, injectable } from 'tsyringe'
import { PadraoCor } from '@modules/configuracao/infra/typeorm/entities/padrao-cor'
import { IPadraoCorRepository } from '@modules/configuracao/repositories/i-padrao-cor-repository'
import { AppError } from '@shared/errors/app-error'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  id: string
  nome: string
  descricao: string
}

@injectable()
class UpdatePadraoCorUseCase {
  constructor(@inject('PadraoCorRepository')
    private padraoCorRepository: IPadraoCorRepository
  ) {}

  async execute({
    id,
    nome,
    descricao
  }: IRequest): Promise<HttpResponse> {
    const padraoCor = await this.padraoCorRepository.update({
      id,
      nome,
      descricao
    })

    return padraoCor
  }
}

export { UpdatePadraoCorUseCase }
