import { inject, injectable } from 'tsyringe'
import { Cidade } from '@modules/comum/infra/typeorm/entities/cidade'
import { ICidadeRepository } from '@modules/comum/repositories/i-cidade-repository'
import { AppError } from '@shared/errors/app-error'

interface IRequest {
  estadoId: string
  codigoIbge: string
  nomeCidade: string
}

@injectable()
class CreateCidadeUseCase {
  constructor(@inject('CidadeRepository')
    private cidadeRepository: ICidadeRepository
  ) {}

  async execute({
    estadoId,
    codigoIbge,
    nomeCidade
  }: IRequest): Promise<Cidade> {
    const result = await this.cidadeRepository.create({
        estadoId,
        codigoIbge,
        nomeCidade
      })
      .then(cidadeResult => {
        return cidadeResult
      })
      .catch(error => {
        return error
      })

    return result
  }
}

export { CreateCidadeUseCase }
