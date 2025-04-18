import { Request, Response } from "express"
import { container } from "tsyringe"
import { UpdateMedicaoUseCase } from "./update-medicao-use-case"

class UpdateMedicaoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
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
    } = request.body

    const { id } = request.params

    const updateMedicaoUseCase = container.resolve(UpdateMedicaoUseCase)

    const result = await updateMedicaoUseCase
      .execute({
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
      .then((medicaoResult) => {
        return medicaoResult
      })
      .catch((error) => {
        return error
      })

    return response.status(result.statusCode).json(result)
  }
}

export { UpdateMedicaoController }
