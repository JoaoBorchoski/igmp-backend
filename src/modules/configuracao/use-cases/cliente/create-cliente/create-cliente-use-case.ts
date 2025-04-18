import { inject, injectable } from 'tsyringe'
import { Cliente } from '@modules/configuracao/infra/typeorm/entities/cliente'
import { IClienteRepository } from '@modules/configuracao/repositories/i-cliente-repository'
import { AppError } from '@shared/errors/app-error'

interface IRequest {
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
class CreateClienteUseCase {
  constructor(@inject('ClienteRepository')
    private clienteRepository: IClienteRepository
  ) {}

  async execute({
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
  }: IRequest): Promise<Cliente> {
    const result = await this.clienteRepository.create({
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
      .then(clienteResult => {
        return clienteResult
      })
      .catch(error => {
        return error
      })

    return result
  }
}

export { CreateClienteUseCase }
