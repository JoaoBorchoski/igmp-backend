import { inject, injectable } from 'tsyringe'
import { LarguraVaos } from '@modules/configuracao/infra/typeorm/entities/largura-vaos'
import { ILarguraVaosRepository } from '@modules/configuracao/repositories/i-largura-vaos-repository'
import { AppError } from '@shared/errors/app-error'

interface IRequest {
  nome: string
  descricao: string
}

@injectable()
class CreateLarguraVaosUseCase {
  constructor(@inject('LarguraVaosRepository')
    private larguraVaosRepository: ILarguraVaosRepository
  ) {}

  async execute({
    nome,
    descricao
  }: IRequest): Promise<LarguraVaos> {
    const result = await this.larguraVaosRepository.create({
        nome,
        descricao
      })
      .then(larguraVaosResult => {
        return larguraVaosResult
      })
      .catch(error => {
        return error
      })

    return result
  }
}

export { CreateLarguraVaosUseCase }
