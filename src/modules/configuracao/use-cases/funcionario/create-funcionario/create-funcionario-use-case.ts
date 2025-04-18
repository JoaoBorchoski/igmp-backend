import { inject, injectable } from 'tsyringe'
import { Funcionario } from '@modules/configuracao/infra/typeorm/entities/funcionario'
import { IFuncionarioRepository } from '@modules/configuracao/repositories/i-funcionario-repository'
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
class CreateFuncionarioUseCase {
  constructor(@inject('FuncionarioRepository')
    private funcionarioRepository: IFuncionarioRepository
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
  }: IRequest): Promise<Funcionario> {
    const result = await this.funcionarioRepository.create({
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
      .then(funcionarioResult => {
        return funcionarioResult
      })
      .catch(error => {
        return error
      })

    return result
  }
}

export { CreateFuncionarioUseCase }
