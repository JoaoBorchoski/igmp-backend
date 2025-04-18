import { inject, injectable } from "tsyringe"
import { IAlturaVaosRepository } from '@modules/configuracao/repositories/i-altura-vaos-repository'
import { HttpResponse } from '@shared/helpers/http'

@injectable()
class IdSelectAlturaVaosUseCase {
  constructor(@inject('AlturaVaosRepository')
    private alturaVaosRepository: IAlturaVaosRepository
  ) {}

  async execute({ id }): Promise<HttpResponse> {
    const alturaVaos = await this.alturaVaosRepository.idSelect(id)

    return alturaVaos
  }
}

export { IdSelectAlturaVaosUseCase }
