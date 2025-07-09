import { inject, injectable } from "tsyringe"
import { Pedido } from "@modules/operacao/infra/typeorm/entities/pedido"
import { IPedidoRepository } from "@modules/operacao/repositories/i-pedido-repository"
import { AppError } from "@shared/errors/app-error"
import { HttpResponse, serverError } from "@shared/helpers"
import { getConnection } from "typeorm"
import { IPedidoItemRepository } from "@modules/operacao/repositories/i-pedido-item-repository"

interface IRequest {
    id: string
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
class UpdatePedidoUseCase {
    constructor(
        @inject("PedidoRepository")
        private pedidoRepository: IPedidoRepository,
        @inject("PedidoItemRepository")
        private pedidoItemRepository: IPedidoItemRepository
    ) {}

    async execute({
        id,
        sequencial,
        descricao,
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
        dataEmissao,
        pedidoItems,
    }: IRequest): Promise<HttpResponse> {
        const queryRunner = getConnection().createQueryRunner()
        await queryRunner.startTransaction()

        try {
            const pedido = await this.pedidoRepository.updateWithQueryRunner(
                {
                    id,
                    sequencial,
                    descricao,
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
                    dataEmissao,
                },
                queryRunner.manager
            )

            const itemsPedidos = await this.pedidoItemRepository.getByPedidoId(pedido.data.id)

            const itemsApagados = itemsPedidos.data.filter(
                (item) => !pedidoItems.some((pedidoItem) => pedidoItem.id === item.produto)
            )

            await this.pedidoItemRepository.deleteWithQueryRunner(
                itemsApagados.map((item) => item.id),
                queryRunner.manager
            )

            for await (const item of pedidoItems) {
                const pedidoItem = await this.pedidoItemRepository.getByPedidoIdAndProduto(pedido.data.id, item.id)

                if (!pedidoItem.data) {
                    await this.pedidoItemRepository.createWithQueryRunner(
                        {
                            pedidoId: pedido.data.id,
                            produto: item.id,
                            quantidade: item.quantidade,
                        },
                        queryRunner.manager
                    )
                    continue
                }

                await this.pedidoItemRepository.updateWithQueryRunner(
                    { id: pedidoItem.data.id, quantidade: item.quantidade },
                    queryRunner.manager
                )
            }

            await queryRunner.commitTransaction()

            return pedido
        } catch (error) {
            console.log("Error updating pedido:", error)
            await queryRunner.rollbackTransaction()
            return serverError(error)
        } finally {
            await queryRunner.release()
        }
    }
}

export { UpdatePedidoUseCase }
