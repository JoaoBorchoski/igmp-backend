import { inject, injectable } from 'tsyringe'
import { Pedido } from '@modules/operacao/infra/typeorm/entities/pedido'
import { IPedidoRepository } from '@modules/operacao/repositories/i-pedido-repository'
import { AppError } from '@shared/errors/app-error'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  id: string
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
class UpdatePedidoUseCase {
  constructor(@inject('PedidoRepository')
    private pedidoRepository: IPedidoRepository
  ) {}

  async execute({
    id,
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
  }: IRequest): Promise<HttpResponse> {
    const pedido = await this.pedidoRepository.update({
      id,
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

    return pedido
  }
}

export { UpdatePedidoUseCase }
