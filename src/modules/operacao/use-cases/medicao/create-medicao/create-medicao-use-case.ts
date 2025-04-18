import { inject, injectable } from "tsyringe"
import { Medicao } from "@modules/operacao/infra/typeorm/entities/medicao"
import { IMedicaoRepository } from "@modules/operacao/repositories/i-medicao-repository"
import { AppError } from "@shared/errors/app-error"

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
    private medicaoRepository: IMedicaoRepository
  ) {}

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

    return result
  }
}

export { CreateMedicaoUseCase }
