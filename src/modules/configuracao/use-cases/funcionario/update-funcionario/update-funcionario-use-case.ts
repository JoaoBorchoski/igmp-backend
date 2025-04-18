import { inject, injectable } from 'tsyringe'
import { Funcionario } from '@modules/configuracao/infra/typeorm/entities/funcionario'
import { IFuncionarioRepository } from '@modules/configuracao/repositories/i-funcionario-repository'
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
class UpdateFuncionarioUseCase {
  constructor(@inject('FuncionarioRepository')
    private funcionarioRepository: IFuncionarioRepository
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
    const funcionario = await this.funcionarioRepository.update({
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

    return funcionario
  }
}

export { UpdateFuncionarioUseCase }
