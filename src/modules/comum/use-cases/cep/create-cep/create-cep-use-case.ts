import { inject, injectable } from 'tsyringe'
import { Cep } from '@modules/comum/infra/typeorm/entities/cep'
import { ICepRepository } from '@modules/comum/repositories/i-cep-repository'
import { AppError } from '@shared/errors/app-error'

interface IRequest {
  codigoCep: string
  logradouro: string
  bairro: string
  estadoId: string
  cidadeId: string
}

@injectable()
class CreateCepUseCase {
  constructor(@inject('CepRepository')
    private cepRepository: ICepRepository
  ) {}

  async execute({
    codigoCep,
    logradouro,
    bairro,
    estadoId,
    cidadeId
  }: IRequest): Promise<Cep> {
    const result = await this.cepRepository.create({
        codigoCep,
        logradouro,
        bairro,
        estadoId,
        cidadeId
      })
      .then(cepResult => {
        return cepResult
      })
      .catch(error => {
        return error
      })

    return result
  }
}

export { CreateCepUseCase }
