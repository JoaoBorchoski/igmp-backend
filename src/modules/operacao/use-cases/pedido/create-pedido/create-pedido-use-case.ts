import { inject, injectable } from "tsyringe"
import { Pedido } from "@modules/operacao/infra/typeorm/entities/pedido"
import { IPedidoRepository } from "@modules/operacao/repositories/i-pedido-repository"
import { AppError } from "@shared/errors/app-error"
import { getConnection } from "typeorm"
import { HttpResponse, serverError } from "@shared/helpers"
import { IPedidoItemRepository } from "@modules/operacao/repositories/i-pedido-item-repository"

interface IRequest {
    sequencial: number
    cliente: string
    telefone: string
    cep: string
    endereco: string
    numero: string
    complemento: string
    bairro: string
    estadoId: string
    cidadeId: string
    status: string
    descricao: string
    dataEmissao: Date
    pedidoItems: any[]
}

@injectable()
class CreatePedidoUseCase {
    constructor(
        @inject("PedidoRepository")
        private pedidoRepository: IPedidoRepository,
        @inject("PedidoItemRepository")
        private pedidoItemRepository: IPedidoItemRepository
    ) {}

    async execute({
        sequencial,
        cliente,
        telefone,
        cep,
        endereco,
        numero,
        complemento,
        bairro,
        estadoId,
        cidadeId,
        status,
        descricao,
        dataEmissao,
        pedidoItems,
    }: IRequest): Promise<HttpResponse> {
        const queryRunner = getConnection().createQueryRunner()
        await queryRunner.startTransaction()

        try {
            const result = await this.pedidoRepository
                .createWithQueryRunner(
                    {
                        sequencial,
                        cliente,
                        telefone,
                        cep,
                        endereco,
                        numero,
                        complemento,
                        bairro,
                        estadoId,
                        cidadeId,
                        status,
                        descricao,
                        dataEmissao,
                    },
                    queryRunner.manager
                )
                .then((pedidoResult) => {
                    return pedidoResult
                })
                .catch((error) => {
                    return error
                })

            for await (const item of pedidoItems) {
                await this.pedidoItemRepository.createWithQueryRunner(
                    {
                        pedidoId: result.data.id,
                        produto: item.id,
                        quantidade: item.quantidade,
                    },
                    queryRunner.manager
                )
            }

            await queryRunner.commitTransaction()
            return result
        } catch (error) {
            await queryRunner.rollbackTransaction()
            return serverError(error)
        } finally {
            await queryRunner.release()
        }
    }
}

export { CreatePedidoUseCase }
