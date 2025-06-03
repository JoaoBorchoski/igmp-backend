import { inject, injectable } from "tsyringe"
import { TipoPorta } from "@modules/configuracao/infra/typeorm/entities/tipo-porta"
import { ITipoPortaRepository } from "@modules/configuracao/repositories/i-tipo-porta-repository"
import { HttpResponse } from "@shared/helpers"
import { IProdutoRepository } from "@modules/configuracao/repositories/i-produto-repository"

@injectable()
class DeleteProdutoUseCase {
  constructor(
    @inject("ProdutoRepository")
    private produtoRepository: IProdutoRepository
  ) {}

  async execute(id: string): Promise<HttpResponse> {
    const tipoPorta = await this.produtoRepository.delete(id)

    return tipoPorta
  }
}

export { DeleteProdutoUseCase }
