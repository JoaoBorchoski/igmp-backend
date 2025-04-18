import { inject, injectable } from 'tsyringe'
import { Cliente } from '@modules/configuracao/infra/typeorm/entities/cliente'
import { IClienteRepository } from '@modules/configuracao/repositories/i-cliente-repository'
import { HttpResponse } from '@shared/helpers'

@injectable()
class DeleteClienteUseCase {
  constructor(@inject('ClienteRepository')
    private clienteRepository: IClienteRepository
  ) {}

  async execute(id: string): Promise<HttpResponse> {
    const cliente = await this.clienteRepository.delete(id)

    return cliente
  }
}

export { DeleteClienteUseCase }
