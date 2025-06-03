import { inject, injectable } from "tsyringe"
import { TipoPorta } from "@modules/configuracao/infra/typeorm/entities/tipo-porta"
import { ITipoPortaRepository } from "@modules/configuracao/repositories/i-tipo-porta-repository"
import { AppError } from "@shared/errors/app-error"
import { IProdutoRepository } from "@modules/configuracao/repositories/i-produto-repository"
import { Produto } from "@modules/configuracao/infra/typeorm/entities/produto"

interface IRequest {
    nome: string
    descricao: string
    tipo: number
    sentidoAbertura: string
    tipoPorta: string
    tipoEnchimento: string
    fechadura: string
    alturaPorta: number
    larguraPorta: number
    espessuraPorta: number
    larguraBatatente: number
    espessuraCanalAlizar: number
}

@injectable()
class CreateProdutoUseCase {
    constructor(
        @inject("ProdutoRepository")
        private produtoRepository: IProdutoRepository
    ) {}

    async execute({
        nome,
        descricao,
        tipo,
        sentidoAbertura,
        tipoPorta,
        tipoEnchimento,
        fechadura,
        alturaPorta,
        larguraPorta,
        espessuraPorta,
        larguraBatatente,
        espessuraCanalAlizar,
    }: IRequest): Promise<Produto> {
        const result = await this.produtoRepository
            .create({
                nome,
                descricao,
                tipo,
                sentidoAbertura,
                tipoPorta,
                tipoEnchimento,
                fechadura,
                alturaPorta,
                larguraPorta,
                espessuraPorta,
                larguraBatatente,
                espessuraCanalAlizar,
            })
            .then((tipoPortaResult) => {
                return tipoPortaResult
            })
            .catch((error) => {
                return error
            })

        return result
    }
}

export { CreateProdutoUseCase }
