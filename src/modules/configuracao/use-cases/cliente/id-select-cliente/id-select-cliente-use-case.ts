import { inject, injectable } from "tsyringe"
import { IClienteRepository } from '@modules/configuracao/repositories/i-cliente-repository'
import { HttpResponse } from '@shared/helpers/http'

@injectable()
class IdSelectClienteUseCase {
  constructor(@inject('ClienteRepository')
    private clienteRepository: IClienteRepository
  ) {}

  async execute({ id }): Promise<HttpResponse> {
    const cliente = await this.clienteRepository.idSelect(id)

    return cliente
  }
}

export { IdSelectClienteUseCase }
