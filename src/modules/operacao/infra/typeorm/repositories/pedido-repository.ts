import { Brackets, EntityManager, getRepository, Repository } from "typeorm"
import { IPedidoDTO } from "@modules/operacao/dtos/i-pedido-dto"
import { IPedidoRepository } from "@modules/operacao/repositories/i-pedido-repository"
import { Pedido } from "@modules/operacao/infra/typeorm/entities/pedido"
import { noContent, serverError, ok, notFound, HttpResponse } from "@shared/helpers"
import { AppError } from "@shared/errors/app-error"

class PedidoRepository implements IPedidoRepository {
    private repository: Repository<Pedido>

    constructor() {
        this.repository = getRepository(Pedido)
    }

    // create
    async create({
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
    }: IPedidoDTO): Promise<HttpResponse> {
        const seqAtual = await this.repository
            .createQueryBuilder("ped")
            .select("MAX(ped.sequencial)", "maxSequencial")
            .getRawOne()
        sequencial = seqAtual.maxSequencial ? seqAtual.maxSequencial + 1 : sequencial

        const pedido = this.repository.create({
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
        })

        const result = await this.repository
            .save(pedido)
            .then((pedidoResult) => {
                return ok(pedidoResult)
            })
            .catch((error) => {
                return serverError(error)
            })

        return result
    }

    async createWithQueryRunner(
        {
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
        }: IPedidoDTO,
        transactionManager: EntityManager
    ): Promise<HttpResponse> {
        const seqAtual = await this.repository
            .createQueryBuilder("ped")
            .select("MAX(ped.sequencial)", "maxSequencial")
            .getRawOne()
        sequencial = seqAtual.maxSequencial ? seqAtual.maxSequencial + 1 : sequencial

        const pedido = transactionManager.create(Pedido, {
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
        })

        const result = await transactionManager
            .save(pedido)
            .then((pedidoResult) => {
                return ok(pedidoResult)
            })
            .catch((error) => {
                return serverError(error)
            })

        return result
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

        const referenceArray = ["sequencial", "cliente", "estadoUf"]
        const columnOrder = new Array<"ASC" | "DESC">(2).fill("ASC")

        const index = referenceArray.indexOf(columnName)

        columnOrder[index] = columnDirection

        const offset = rowsPerPage * page

        try {
            let query = this.repository
                .createQueryBuilder("ped")
                .select([
                    'ped.id as "id"',
                    'ped.sequencial as "sequencial"',
                    'ped.cliente as "cliente"',
                    'a.id as "estadoId"',
                    'a.uf as "estadoUf"',
                ])
                .leftJoin("ped.estadoId", "a")

            if (filter) {
                query = query.where(filter)
            }

            const pedidos = await query
                .andWhere(
                    new Brackets((query) => {
                        query.andWhere("CAST(ped.sequencial AS VARCHAR) ilike :search", { search: `%${search}%` })
                        query.orWhere("CAST(ped.cliente AS VARCHAR) ilike :search", { search: `%${search}%` })
                    })
                )
                .addOrderBy("ped.sequencial", columnOrder[0])
                .addOrderBy("ped.cliente", columnOrder[1])
                .addOrderBy("a.uf", columnOrder[2])
                .offset(offset)
                .limit(rowsPerPage)
                .take(rowsPerPage)
                .getRawMany()

            return ok(pedidos)
        } catch (err) {
            return serverError(err)
        }
    }

    // select
    async select(filter: string): Promise<HttpResponse> {
        try {
            const pedidos = await this.repository
                .createQueryBuilder("ped")
                .select(['ped.id as "value"', 'ped.sequencial as "label"'])
                .where("ped.sequencial ilike :filter", { filter: `${filter}%` })
                .addOrderBy("ped.sequencial")
                .getRawMany()

            return ok(pedidos)
        } catch (err) {
            return serverError(err)
        }
    }

    // id select
    async idSelect(id: string): Promise<HttpResponse> {
        try {
            const pedido = await this.repository
                .createQueryBuilder("ped")
                .select(['ped.id as "value"', 'ped.sequencial as "label"'])
                .where("ped.id = :id", { id: `${id}` })
                .getRawOne()

            return ok(pedido)
        } catch (err) {
            return serverError(err)
        }
    }

    // count
    async count(search: string, filter: string): Promise<HttpResponse> {
        try {
            let query = this.repository.createQueryBuilder("ped").select(['ped.id as "id"']).leftJoin("ped.estadoId", "a")

            if (filter) {
                query = query.where(filter)
            }

            const pedidos = await query
                .andWhere(
                    new Brackets((query) => {
                        query.andWhere("CAST(ped.sequencial AS VARCHAR) ilike :search", { search: `%${search}%` })
                        query.orWhere("CAST(ped.cliente AS VARCHAR) ilike :search", { search: `%${search}%` })
                    })
                )
                .getRawMany()

            return ok({ count: pedidos.length })
        } catch (err) {
            return serverError(err)
        }
    }

    // get
    async get(id: string): Promise<HttpResponse> {
        try {
            const pedido = await this.repository
                .createQueryBuilder("ped")
                .select([
                    'ped.id as "id"',
                    'ped.sequencial as "sequencial"',
                    'ped.cliente as "cliente"',
                    'ped.telefone as "telefone"',
                    'ped.cep as "cep"',
                    'ped.endereco as "endereco"',
                    'ped.numero as "numero"',
                    'ped.complemento as "complemento"',
                    'ped.bairro as "bairro"',
                    'ped.estadoId as "estadoId"',
                    'a.uf as "estadoUf"',
                    'ped.cidadeId as "cidadeId"',
                    'b.nomeCidade as "cidadeNome"',
                    'ped.status as "status"',
                ])
                .leftJoin("ped.estadoId", "a")
                .leftJoin("ped.cidadeId", "b")
                .where("ped.id = :id", { id })
                .getRawOne()

            if (typeof pedido === "undefined") {
                return noContent()
            }

            return ok(pedido)
        } catch (err) {
            console.log(err)
            return serverError(err)
        }
    }

    // update
    async update({
        id,
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
    }: IPedidoDTO): Promise<HttpResponse> {
        const pedido = await this.repository.findOne(id)

        if (!pedido) {
            return notFound()
        }

        const newpedido = this.repository.create({
            id,
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
        })

        try {
            await this.repository.save(newpedido)

            return ok(newpedido)
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
}

export { PedidoRepository }
