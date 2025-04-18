import { Request, Response } from "express"
import { container } from "tsyringe"
import { CreateCadastroObraUseCase } from "./create-cadastro-obra-use-case"
import { HttpResponse } from "@shared/helpers"

class CreateCadastroObraController {
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

    const createCadastroObraUseCase = container.resolve(CreateCadastroObraUseCase)

    const result = await createCadastroObraUseCase
      .execute({
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

export { CreateCadastroObraController }
