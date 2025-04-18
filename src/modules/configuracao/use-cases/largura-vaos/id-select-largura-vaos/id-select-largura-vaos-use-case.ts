import { inject, injectable } from "tsyringe"
import { ILarguraVaosRepository } from '@modules/configuracao/repositories/i-largura-vaos-repository'
import { HttpResponse } from '@shared/helpers/http'

@injectable()
class IdSelectLarguraVaosUseCase {
  constructor(@inject('LarguraVaosRepository')
    private larguraVaosRepository: ILarguraVaosRepository
  ) {}

  async execute({ id }): Promise<HttpResponse> {
    const larguraVaos = await this.larguraVaosRepository.idSelect(id)

    return larguraVaos
  }
}

export { IdSelectLarguraVaosUseCase }
