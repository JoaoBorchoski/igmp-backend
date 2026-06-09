import { inject, injectable } from 'tsyringe'
import { Cliente } from '@modules/configuracao/infra/typeorm/entities/cliente'
import { IClienteRepository } from '@modules/configuracao/repositories/i-cliente-repository'
import { AppError } from '@shared/errors/app-error'
import { createError, HttpResponse, ok } from '@shared/helpers'

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
	constructor(
		@inject('ClienteRepository')
		private clienteRepository: IClienteRepository,
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
		desabilitado,
	}: IRequest): Promise<HttpResponse> {
		try {
			if (cpf) {
				const clienteExists = await this.clienteRepository.getByCpf(cpf)
				if (clienteExists.data) {
					return createError(410, 'CPF/CNPJ já cadastrado.')
				}
			}

			const result = await this.clienteRepository
				.create({
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
					desabilitado,
				})
				.then((clienteResult) => {
					return clienteResult
				})
				.catch((error) => {
					return error
				})

			return ok(result)
		} catch (error) {
			return createError(500, 'Erro ao criar cliente')
		}
	}
}

export { CreateClienteUseCase }
