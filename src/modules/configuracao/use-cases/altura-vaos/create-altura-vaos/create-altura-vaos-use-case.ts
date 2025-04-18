import { inject, injectable } from 'tsyringe'
import { AlturaVaos } from '@modules/configuracao/infra/typeorm/entities/altura-vaos'
import { IAlturaVaosRepository } from '@modules/configuracao/repositories/i-altura-vaos-repository'
import { AppError } from '@shared/errors/app-error'

interface IRequest {
  nome: string
  descricao: string
}

@injectable()
class CreateAlturaVaosUseCase {
  constructor(@inject('AlturaVaosRepository')
    private alturaVaosRepository: IAlturaVaosRepository
  ) {}

  async execute({
    nome,
    descricao
  }: IRequest): Promise<AlturaVaos> {
    const result = await this.alturaVaosRepository.create({
        nome,
        descricao
      })
      .then(alturaVaosResult => {
        return alturaVaosResult
      })
      .catch(error => {
        return error
      })

    return result
  }
}

export { CreateAlturaVaosUseCase }
