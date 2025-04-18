import { inject, injectable } from 'tsyringe'
import { Cliente } from '@modules/configuracao/infra/typeorm/entities/cliente'
import { IClienteRepository } from '@modules/configuracao/repositories/i-cliente-repository'
import { AppError } from '@shared/errors/app-error'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  id: string
  nome: string
  cpf: string
  rg: string
  email: string
  cep: string
  paisId: string
  estadoId: string
  cidadeId: string
  bairro: string
  endereco: string
  numero: number
  complemento: string
  telefone: string
  observacoes: string
  usuarioId: string
  desabilitado: boolean
}

@injectable()
class UpdateClienteUseCase {
  constructor(@inject('ClienteRepository')
    private clienteRepository: IClienteRepository
  ) {}

  async execute({
    id,
    nome,
    cpf,
    rg,
    email,
    cep,
    paisId,
    estadoId,
    cidadeId,
    bairro,
    endereco,
    numero,
    complemento,
    telefone,
    observacoes,
    usuarioId,
    desabilitado
  }: IRequest): Promise<HttpResponse> {
    const cliente = await this.clienteRepository.update({
      id,
      nome,
      cpf,
      rg,
      email,
      cep,
      paisId,
      estadoId,
      cidadeId,
      bairro,
      endereco,
      numero,
      complemento,
      telefone,
      observacoes,
      usuarioId,
      desabilitado
    })

    return cliente
  }
}

export { UpdateClienteUseCase }
