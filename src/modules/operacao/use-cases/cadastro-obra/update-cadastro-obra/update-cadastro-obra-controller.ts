import { Request, Response } from "express"
import { container } from "tsyringe"
import { UpdateCadastroObraUseCase } from "./update-cadastro-obra-use-case"

class UpdateCadastroObraController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
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
    } = request.body

    const { id } = request.params

    const updateCadastroObraUseCase = container.resolve(UpdateCadastroObraUseCase)

    const result = await updateCadastroObraUseCase
      .execute({
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
      .then((cadastroObraResult) => {
        return cadastroObraResult
      })
      .catch((error) => {
        return error
      })

    return response.status(result.statusCode).json(result)
  }
}

export { UpdateCadastroObraController }
