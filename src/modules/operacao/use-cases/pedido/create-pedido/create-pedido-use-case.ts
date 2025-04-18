import { inject, injectable } from 'tsyringe'
import { Pedido } from '@modules/operacao/infra/typeorm/entities/pedido'
import { IPedidoRepository } from '@modules/operacao/repositories/i-pedido-repository'
import { AppError } from '@shared/errors/app-error'

interface IRequest {
  sequencial: number
  cliente: string
  telefone: string
  cep: string
  endereco: string
  numero: string
  complemento: string
  bairro: string
  estadoId: string
  cidadeId: string
  status: string
}

@injectable()
class CreatePedidoUseCase {
  constructor(@inject('PedidoRepository')
    private pedidoRepository: IPedidoRepository
  ) {}

  async execute({
    sequencial,
    cliente,
    telefone,
    cep,
    endereco,
    numero,
    complemento,
    bairro,
    estadoId,
    cidadeId,
    status
  }: IRequest): Promise<Pedido> {
    const result = await this.pedidoRepository.create({
        sequencial,
        cliente,
        telefone,
        cep,
        endereco,
        numero,
        complemento,
        bairro,
        estadoId,
        cidadeId,
        status
      })
      .then(pedidoResult => {
        return pedidoResult
      })
      .catch(error => {
        return error
      })

    return result
  }
}

export { CreatePedidoUseCase }
