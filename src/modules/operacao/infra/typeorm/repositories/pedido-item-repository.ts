import { Brackets, EntityManager, getRepository, Repository } from "typeorm"
import { IPedidoItemDTO } from "@modules/operacao/dtos/i-pedido-item-dto"
import { IPedidoItemRepository } from "@modules/operacao/repositories/i-pedido-item-repository"
import { PedidoItem } from "@modules/operacao/infra/typeorm/entities/pedido-item"
import { noContent, serverError, ok, notFound, HttpResponse } from "@shared/helpers"
import { AppError } from "@shared/errors/app-error"

class PedidoItemRepository implements IPedidoItemRepository {
    private repository: Repository<PedidoItem>

    constructor() {
        this.repository = getRepository(PedidoItem)
    }

    // create
    async create({ pedidoId, produto, quantidade, corEtiqueta, kit }: IPedidoItemDTO): Promise<HttpResponse> {
        const pedidoItem = this.repository.create({
            pedidoId,
            produto,
            quantidade,
            corEtiqueta,
            kit,
        })

        const result = await this.repository
            .save(pedidoItem)
            .then((pedidoItemResult) => {
                return ok(pedidoItemResult)
            })
            .catch((error) => {
                return serverError(error)
            })

        return result
    }

    async createWithQueryRunner(
        { pedidoId, produto, quantidade, corEtiqueta, kit }: IPedidoItemDTO,
        transactionManager: EntityManager
    ): Promise<HttpResponse> {
        try {
            // Verificar se a transação ainda está ativa
            if (!transactionManager.queryRunner || !transactionManager.queryRunner.isTransactionActive) {
                console.log("ERRO: Transação não está mais ativa ao tentar criar pedidoItem!")
                return serverError(new Error("Transação não está mais ativa"))
            }

            console.log("Criando pedidoItem com dados:", { pedidoId, produto, quantidade, corEtiqueta, kit })
            console.log("Tipo do pedidoId:", typeof pedidoId)
            console.log("Tipo do produto:", typeof produto)
            console.log("Tipo da quantidade:", typeof quantidade)

            // Verificar se pedidoId é válido
            if (!pedidoId) {
                throw new Error("pedidoId é obrigatório")
            }

            // Verificar se produto é válido
            if (!produto) {
                throw new Error("produto é obrigatório")
            }

            const pedidoItem = transactionManager.create(PedidoItem, {
                pedidoId,
                produto,
                quantidade,
                corEtiqueta,
                kit,
            })

            console.log("PedidoItem criado (antes do save):", pedidoItem)

            const result = await transactionManager
                .save(pedidoItem)
                .then((pedidoItemResult) => {
                    console.log("PedidoItem criado com sucesso:", pedidoItemResult)
                    return ok(pedidoItemResult)
                })
                .catch((error) => {
                    console.log("=== ERRO DETALHADO AO SALVAR PEDIDO ITEM ===")
                    console.log("Erro completo:", error)
                    console.log("Mensagem:", error.message)
                    console.log("Código:", error.code)
                    console.log("Stack:", error.stack)
                    console.log("Dados que causaram o erro:", { pedidoId, produto, quantidade, corEtiqueta, kit })
                    console.log("=== FIM ERRO DETALHADO ===")
                    return serverError(error)
                })

            return result
        } catch (error) {
            console.log("Erro geral na criação do pedidoItem:", error)
            return serverError(error)
        }
    }

    // list
    async list(search: string, page: number, rowsPerPage: number, order: string, filter: string): Promise<HttpResponse> {
        let columnName: string
        let columnDirection: "ASC" | "DESC"

        if (typeof order === "undefined" || order === "") {
            columnName = "nome"
            columnDirection = "ASC"
        } else {
            columnName = order.substring(0, 1) === "-" ? order.substring(1) : order
            columnDirection = order.substring(0, 1) === "-" ? "DESC" : "ASC"
        }

        const referenceArray = ["pedidoSequencial", "quantidade", "corEtiqueta"]
        const columnOrder = new Array<"ASC" | "DESC">(2).fill("ASC")

        const index = referenceArray.indexOf(columnName)

        columnOrder[index] = columnDirection

        const offset = rowsPerPage * page

        try {
            let query = this.repository
                .createQueryBuilder("ped")
                .select([
                    'ped.id as "id"',
                    'a.id as "pedidoId"',
                    'a.sequencial as "pedidoSequencial"',
                    'ped.quantidade as "quantidade"',
                    'ped.corEtiqueta as "corEtiqueta"',
                ])
                .leftJoin("ped.pedidoId", "a")

            if (filter) {
                query = query.where(filter)
            }

            const pedidosItems = await query
                .andWhere(
                    new Brackets((query) => {
                        query.andWhere("CAST(a.sequencial AS VARCHAR) ilike :search", { search: `%${search}%` })
                        query.orWhere("CAST(ped.corEtiqueta AS VARCHAR) ilike :search", { search: `%${search}%` })
                    })
                )
                .addOrderBy("a.sequencial", columnOrder[0])
                .addOrderBy("ped.quantidade", columnOrder[1])
                .addOrderBy("ped.corEtiqueta", columnOrder[2])
                .offset(offset)
                .limit(rowsPerPage)
                .take(rowsPerPage)
                .getRawMany()

            return ok(pedidosItems)
        } catch (err) {
            return serverError(err)
        }
    }

    // select
    async select(filter: string): Promise<HttpResponse> {
        try {
            const pedidosItems = await this.repository
                .createQueryBuilder("ped")
                .select(['ped.id as "value"', 'ped.pedidoId as "label"'])
                // .where("ped.pedidoId ilike :filter", { filter: `${filter}%` })
                .addOrderBy("ped.pedidoId")
                .getRawMany()

            return ok(pedidosItems)
        } catch (err) {
            console.log("Error in select:", err)
            return serverError(err)
        }
    }

    async selectByPedidoId(filter: string, pedidoId: string): Promise<HttpResponse> {
        try {
            let query = this.repository
                .createQueryBuilder("ped")
                .select(['ped.id as "value"', "CONCAT(p.nome, ' - ', p.descricao) as \"label\""])
                .leftJoin("produtos", "p", "p.id :: varchar = ped.produto")
                .leftJoin("ped.pedidoId", "a")
                .leftJoin("clientes", "c", "c.id :: varchar = a.cliente")
                .where("ped.pedidoId = :pedidoId", { pedidoId })

            if (filter) {
                query = query.andWhere("p.nome ilike :filter", { filter: `${filter}%` })
                query = query.orWhere("ped.descricao ilike :filter", { filter: `${filter}%` })
            }

            const pedidosItems = await query.addOrderBy("ped.pedidoId").getRawMany()

            return ok(pedidosItems)
        } catch (err) {
            console.log("Error in selectByPedidoId:", err)
            return serverError(err)
        }
    }

    // id select
    async idSelect(id: string): Promise<HttpResponse> {
        try {
            const pedidoItem = await this.repository
                .createQueryBuilder("ped")
                .select(['ped.id as "value"', "CONCAT(p.nome, ' - ', p.descricao) as \"label\""])
                .leftJoin("produtos", "p", "p.id :: varchar = ped.produto")
                .where("ped.id = :id", { id: `${id}` })
                .getRawOne()

            return ok(pedidoItem)
        } catch (err) {
            console.log("Error in idSelect:", err)
            return serverError(err)
        }
    }

    // count
    async count(search: string, filter: string): Promise<HttpResponse> {
        try {
            let query = this.repository.createQueryBuilder("ped").select(['ped.id as "id"']).leftJoin("ped.pedidoId", "a")

            if (filter) {
                query = query.where(filter)
            }

            const pedidosItems = await query
                .andWhere(
                    new Brackets((query) => {
                        query.andWhere("CAST(a.sequencial AS VARCHAR) ilike :search", { search: `%${search}%` })
                        query.orWhere("CAST(ped.corEtiqueta AS VARCHAR) ilike :search", { search: `%${search}%` })
                    })
                )
                .getRawMany()

            return ok({ count: pedidosItems.length })
        } catch (err) {
            return serverError(err)
        }
    }

    // get
    async get(id: string): Promise<HttpResponse> {
        try {
            const pedidoItem = await this.repository
                .createQueryBuilder("ped")
                .select([
                    'ped.id as "id"',
                    'ped.pedidoId as "pedidoId"',
                    'a.sequencial as "pedidoSequencial"',
                    'ped.produto as "produto"',
                    'ped.quantidade as "quantidade"',
                    'ped.corEtiqueta as "corEtiqueta"',
                ])
                .leftJoin("ped.pedidoId", "a")
                .where("ped.id = :id", { id })
                .getRawOne()

            if (typeof pedidoItem === "undefined") {
                return noContent()
            }

            return ok(pedidoItem)
        } catch (err) {
            return serverError(err)
        }
    }

    async getByPedidoIdAndProduto(pedidoId: string, produto: string): Promise<HttpResponse> {
        try {
            const pedidoItem = await this.repository
                .createQueryBuilder("ped")
                .select([
                    'ped.id as "id"',
                    'ped.pedidoId as "pedidoId"',
                    'a.sequencial as "pedidoSequencial"',
                    'ped.produto as "produto"',
                    'ped.quantidade as "quantidade"',
                    'ped.corEtiqueta as "corEtiqueta"',
                ])
                .leftJoin("ped.pedidoId", "a")
                .where("ped.pedidoId = :pedidoId", { pedidoId })
                .andWhere("ped.produto = :produto", { produto })
                .getRawOne()

            return ok(pedidoItem)
        } catch (err) {
            console.log("Error in getByPedidoIdAndProduto:", err)
            return serverError(err)
        }
    }

    async getByPedidoId(pedidoId: string): Promise<HttpResponse> {
        try {
            const pedidoItems = await this.repository
                .createQueryBuilder("ped")
                .select([
                    'ped.id as "id"',
                    'ped.pedidoId as "pedidoId"',
                    'a.sequencial as "pedidoSequencial"',
                    'ped.produto as "produto"',
                    'ped.quantidade as "quantidade"',
                    'ped.corEtiqueta as "corEtiqueta"',
                ])
                .leftJoin("ped.pedidoId", "a")
                .where("ped.pedidoId = :pedidoId", { pedidoId })
                .getRawMany()

            return ok(pedidoItems)
        } catch (err) {
            return serverError(err)
        }
    }

    async getProduto(id: string): Promise<HttpResponse> {
        try {
            const pedidoItem = await this.repository
                .createQueryBuilder("ped")
                .select(['ped.produto as "produto"', 'p.nome as "produtoNome"', 'p.descricao as "produtoDescricao"'])
                .leftJoin("produtos", "p", "p.id :: varchar = ped.produto")
                .where("ped.id = :id", { id })
                .getRawOne()

            if (typeof pedidoItem === "undefined") {
                return noContent()
            }

            return ok(pedidoItem)
        } catch (err) {
            console.log("Error in getProduto:", err)
            return serverError(err)
        }
    }

    // update
    async update({ id, pedidoId, produto, quantidade, corEtiqueta }: IPedidoItemDTO): Promise<HttpResponse> {
        const pedidoItem = await this.repository.findOne(id)

        if (!pedidoItem) {
            return notFound()
        }

        const newpedidoItem = this.repository.create({
            id,
            pedidoId,
            produto,
            quantidade,
            corEtiqueta,
        })

        try {
            await this.repository.save(newpedidoItem)

            return ok(newpedidoItem)
        } catch (err) {
            return serverError(err)
        }
    }

    async updateWithQueryRunner(
        { id, pedidoId, produto, quantidade, corEtiqueta }: IPedidoItemDTO,
        transactionManager: EntityManager
    ): Promise<HttpResponse> {
        const pedidoItem = await transactionManager.findOne(PedidoItem, id)

        if (!pedidoItem) {
            return notFound()
        }

        const newpedidoItem = transactionManager.create(PedidoItem, {
            id,
            pedidoId,
            produto,
            quantidade,
            corEtiqueta,
        })

        try {
            await transactionManager.save(PedidoItem, newpedidoItem)

            return ok(newpedidoItem)
        } catch (err) {
            return serverError(err)
        }
    }

    // delete
    async delete(id: string): Promise<HttpResponse> {
        try {
            await this.repository.delete(id)

            return noContent()
        } catch (err) {
            if (err.message.slice(0, 10) === "null value") {
                throw new AppError("not null constraint", 404)
            }

            return serverError(err)
        }
    }

    // multi delete
    async multiDelete(ids: string[]): Promise<HttpResponse> {
        try {
            await this.repository.delete(ids)

            return noContent()
        } catch (err) {
            if (err.message.slice(0, 10) === "null value") {
                throw new AppError("not null constraint", 404)
            }

            return serverError(err)
        }
    }

    async deleteWithQueryRunner(ids: string[], transactionManager: EntityManager): Promise<HttpResponse> {
        try {
            await transactionManager.delete(PedidoItem, ids)

            return noContent()
        } catch (err) {
            if (err.message.slice(0, 10) === "null value") {
                throw new AppError("not null constraint", 404)
            }

            return serverError(err)
        }
    }
}

export { PedidoItemRepository }
