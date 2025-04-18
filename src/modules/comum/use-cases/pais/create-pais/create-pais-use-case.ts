import { inject, injectable } from 'tsyringe'
import { Pais } from '@modules/comum/infra/typeorm/entities/pais'
import { IPaisRepository } from '@modules/comum/repositories/i-pais-repository'
import { AppError } from '@shared/errors/app-error'

interface IRequest {
  codigoPais: string
  nomePais: string
}

@injectable()
class CreatePaisUseCase {
  constructor(@inject('PaisRepository')
    private paisRepository: IPaisRepository
  ) {}

  async execute({
    codigoPais,
    nomePais
  }: IRequest): Promise<Pais> {
    const result = await this.paisRepository.create({
        codigoPais,
        nomePais
      })
      .then(paisResult => {
        return paisResult
      })
      .catch(error => {
        return error
      })

    return result
  }
}

export { CreatePaisUseCase }
