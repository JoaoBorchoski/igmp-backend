import { inject, injectable } from 'tsyringe'
import { IClienteRepository } from '@modules/configuracao/repositories/i-cliente-repository'

interface ResponseProps {
  items?: object[]
  hasNext?: boolean
  value?: string
  label?: string
}

@injectable()
class SelectClienteUseCase {
  constructor(@inject('ClienteRepository')
    private clienteRepository: IClienteRepository
  ) {}

  async execute({
    filter,
  }): Promise<ResponseProps> {
    const clientes = await this.clienteRepository.select(filter)

    const newClientes = {
      items: clientes.data,
      hasNext: false
    }

    return newClientes
  }
}

export { SelectClienteUseCase }
