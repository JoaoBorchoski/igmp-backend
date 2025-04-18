import { inject, injectable } from 'tsyringe'
import { Cep } from '@modules/comum/infra/typeorm/entities/cep'
import { ICepRepository } from '@modules/comum/repositories/i-cep-repository'
import { AppError } from '@shared/errors/app-error'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  id: string
  codigoCep: string
  logradouro: string
  bairro: string
  estadoId: string
  cidadeId: string
}

@injectable()
class UpdateCepUseCase {
  constructor(@inject('CepRepository')
    private cepRepository: ICepRepository
  ) {}

  async execute({
    id,
    codigoCep,
    logradouro,
    bairro,
    estadoId,
    cidadeId
  }: IRequest): Promise<HttpResponse> {
    const cep = await this.cepRepository.update({
      id,
      codigoCep,
      logradouro,
      bairro,
      estadoId,
      cidadeId
    })

    return cep
  }
}

export { UpdateCepUseCase }
