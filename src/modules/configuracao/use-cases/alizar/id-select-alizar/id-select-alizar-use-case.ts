import { inject, injectable } from "tsyringe"
import { IAlizarRepository } from '@modules/configuracao/repositories/i-alizar-repository'
import { HttpResponse } from '@shared/helpers/http'

@injectable()
class IdSelectAlizarUseCase {
  constructor(@inject('AlizarRepository')
    private alizarRepository: IAlizarRepository
  ) {}

  async execute({ id }): Promise<HttpResponse> {
    const alizar = await this.alizarRepository.idSelect(id)

    return alizar
  }
}

export { IdSelectAlizarUseCase }
