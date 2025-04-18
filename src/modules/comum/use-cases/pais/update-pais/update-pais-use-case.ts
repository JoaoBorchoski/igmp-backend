import { inject, injectable } from 'tsyringe'
import { Pais } from '@modules/comum/infra/typeorm/entities/pais'
import { IPaisRepository } from '@modules/comum/repositories/i-pais-repository'
import { AppError } from '@shared/errors/app-error'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  id: string
  codigoPais: string
  nomePais: string
}

@injectable()
class UpdatePaisUseCase {
  constructor(@inject('PaisRepository')
    private paisRepository: IPaisRepository
  ) {}

  async execute({
    id,
    codigoPais,
    nomePais
  }: IRequest): Promise<HttpResponse> {
    const pais = await this.paisRepository.update({
      id,
      codigoPais,
      nomePais
    })

    return pais
  }
}

export { UpdatePaisUseCase }
