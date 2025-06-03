import { inject, injectable } from "tsyringe"
import { TipoPorta } from "@modules/configuracao/infra/typeorm/entities/tipo-porta"
import { ITipoPortaRepository } from "@modules/configuracao/repositories/i-tipo-porta-repository"
import { AppError } from "@shared/errors/app-error"
import { HttpResponse } from "@shared/helpers"
import { IProdutoRepository } from "@modules/configuracao/repositories/i-produto-repository"

interface IRequest {
  id: string
  nome: string
  descricao: string
}

@injectable()
class UpdateProdutoUseCase {
  constructor(
    @inject("ProdutoRepository")
    private produtoRepository: IProdutoRepository
  ) {}

  async execute({ id, nome, descricao }: IRequest): Promise<HttpResponse> {
    const tipoPorta = await this.produtoRepository.update({
      id,
      nome,
      descricao,
    })

    return tipoPorta
  }
}

export { UpdateProdutoUseCase }
