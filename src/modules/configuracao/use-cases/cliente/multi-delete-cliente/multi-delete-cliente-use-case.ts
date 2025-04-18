import { inject, injectable } from 'tsyringe'
import { IClienteRepository } from '@modules/configuracao/repositories/i-cliente-repository';
import { HttpResponse } from '@shared/helpers';

@injectable()
class MultiDeleteClienteUseCase {
  constructor(@inject('ClienteRepository')
    private clienteRepository: IClienteRepository
  ) {}

  async execute(ids: string[]): Promise<HttpResponse> {
    const cliente = await this.clienteRepository.multiDelete(ids)

    return cliente
  }
}

export { MultiDeleteClienteUseCase }
