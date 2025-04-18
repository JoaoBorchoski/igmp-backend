import { inject, injectable } from "tsyringe"
import { CadastroObra } from "@modules/operacao/infra/typeorm/entities/cadastro-obra"
import { ICadastroObraRepository } from "@modules/operacao/repositories/i-cadastro-obra-repository"
import { AppError } from "@shared/errors/app-error"

interface IRequest {
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
class CreateCadastroObraUseCase {
  constructor(
    @inject("CadastroObraRepository")
    private cadastroObraRepository: ICadastroObraRepository
  ) {}

  async execute({
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
  }: IRequest): Promise<CadastroObra> {
    const result = await this.cadastroObraRepository
      .create({
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
      .then((cadastroObraResult) => {
        return cadastroObraResult
      })
      .catch((error) => {
        return error
      })

    return result
  }
}

export { CreateCadastroObraUseCase }
