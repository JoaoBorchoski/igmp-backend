import { Request, Response } from "express"
import { container } from "tsyringe"
import { CreateMedicaoUseCase } from "./create-medicao-use-case"
import { HttpResponse } from "@shared/helpers"

class CreateMedicaoController {
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

    const createMedicaoUseCase = container.resolve(CreateMedicaoUseCase)

    const result = await createMedicaoUseCase
      .execute({
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

export { CreateMedicaoController }
