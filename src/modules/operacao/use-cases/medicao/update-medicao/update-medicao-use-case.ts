import { inject, injectable } from "tsyringe"
import { Medicao } from "@modules/operacao/infra/typeorm/entities/medicao"
import { IMedicaoRepository } from "@modules/operacao/repositories/i-medicao-repository"
import { AppError } from "@shared/errors/app-error"
import { HttpResponse } from "@shared/helpers"

interface IRequest {
  id: string
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
class UpdateMedicaoUseCase {
  constructor(
    @inject("MedicaoRepository")
    private medicaoRepository: IMedicaoRepository
  ) {}

  async execute({
    id,
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
  }: IRequest): Promise<HttpResponse> {
    const medicao = await this.medicaoRepository.update({
      id,
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

    return medicao
  }
}

export { UpdateMedicaoUseCase }
