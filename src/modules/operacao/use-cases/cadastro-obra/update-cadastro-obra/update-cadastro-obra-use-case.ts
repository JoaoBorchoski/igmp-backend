import { inject, injectable } from "tsyringe"
import { CadastroObra } from "@modules/operacao/infra/typeorm/entities/cadastro-obra"
import { ICadastroObraRepository } from "@modules/operacao/repositories/i-cadastro-obra-repository"
import { AppError } from "@shared/errors/app-error"
import { HttpResponse } from "@shared/helpers"

interface IRequest {
  id: string
  nome: string
  cliente: string
  cnpj: string
  endereco: string
  responsavelObra: string
  contato: string
  previsaoEntrega: Date
  tipoObra: string
  plantasIguais: boolean
  qtdCasas: number
  grupoCasas: string
  estruturaPredio: string
  qtdAptoPorAndar: number
  andares: number
  qtdAptos: number
  grupoAndares: string
  padraoCorId: string
  solidaMadeirada: string
  coresTiposId: string
}

@injectable()
class UpdateCadastroObraUseCase {
  constructor(
    @inject("CadastroObraRepository")
    private cadastroObraRepository: ICadastroObraRepository
  ) {}

  async execute({
    id,
    nome,
    cliente,
    cnpj,
    endereco,
    responsavelObra,
    contato,
    previsaoEntrega,
    tipoObra,
    plantasIguais,
    qtdCasas,
    grupoCasas,
    estruturaPredio,
    qtdAptoPorAndar,
    andares,
    qtdAptos,
    grupoAndares,
    padraoCorId,
    solidaMadeirada,
    coresTiposId,
  }: IRequest): Promise<HttpResponse> {
    const cadastroObra = await this.cadastroObraRepository.update({
      id,
      nome,
      cliente,
      cnpj,
      endereco,
      responsavelObra,
      contato,
      previsaoEntrega,
      tipoObra,
      plantasIguais,
      qtdCasas,
      grupoCasas,
      estruturaPredio,
      qtdAptoPorAndar,
      andares,
      qtdAptos,
      grupoAndares,
      padraoCorId,
      solidaMadeirada,
      coresTiposId,
    })

    return cadastroObra
  }
}

export { UpdateCadastroObraUseCase }
