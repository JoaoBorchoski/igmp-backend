import { inject, injectable } from "tsyringe"
import { Medicao } from "@modules/operacao/infra/typeorm/entities/medicao"
import { IMedicaoRepository } from "@modules/operacao/repositories/i-medicao-repository"
import { AppError } from "@shared/errors/app-error"
import { INegociacaoRepository } from "@modules/operacao/repositories/i-negociacao-repository"
import { ICadastroObraRepository } from "@modules/operacao/repositories/i-cadastro-obra-repository"

interface IRequest {
  cadastroObraId: string
  complemento: string
  espessuraParede: string
  larguraVaosId: string
  alturaVaosId: string
  tipoEnchimentoId: string
  tipoPortaId: string
  confirmacao: boolean
  complementoOrigemId: string
  sentidoAberturaId: string
  alizarId: string
  fechaduraId: string
}

@injectable()
class CreateMedicaoUseCase {
  constructor(
    @inject("MedicaoRepository")
    private medicaoRepository: IMedicaoRepository,
    @inject("NegociacaoRepository")
    private negociacaoRepository: INegociacaoRepository,
    @inject("CadastroObraRepository")
    private cadastroObraRepository: ICadastroObraRepository
  ) { }

  async execute({
    cadastroObraId,
    complemento,
    espessuraParede,
    larguraVaosId,
    alturaVaosId,
    tipoEnchimentoId,
    tipoPortaId,
    confirmacao,
    complementoOrigemId,
    sentidoAberturaId,
    alizarId,
    fechaduraId,
  }: IRequest): Promise<Medicao> {
    const result = await this.medicaoRepository
      .create({
        cadastroObraId,
        complemento,
        espessuraParede,
        larguraVaosId,
        alturaVaosId,
        tipoEnchimentoId,
        tipoPortaId,
        confirmacao,
        complementoOrigemId,
        sentidoAberturaId,
        alizarId,
        fechaduraId,
      })
      .then((medicaoResult) => {
        return medicaoResult
      })
      .catch((error) => {
        return error
      })

    const obra = await this.cadastroObraRepository.get(cadastroObraId)

    const negociacao = await this.negociacaoRepository.create({
      clienteId: obra.data.cliente,
      descricao: `Medição ${result.data.complemento}`,
      status: '0',
      dataCriacao: new Date(),
      valorEstimado: 0,
      medicaoId: result.data.id,
    })

    return result
  }
}

export { CreateMedicaoUseCase }
