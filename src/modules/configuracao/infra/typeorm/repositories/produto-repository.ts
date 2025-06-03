import { Brackets, EntityManager, getRepository, Repository } from "typeorm"
import { ITipoPortaDTO } from "@modules/configuracao/dtos/i-tipo-porta-dto"
import { noContent, serverError, ok, notFound, HttpResponse } from "@shared/helpers"
import { AppError } from "@shared/errors/app-error"
import { Produto } from "../entities/produto"
import { IProdutoRepository } from "@modules/configuracao/repositories/i-produto-repository"
import { IProdutoDTO } from "@modules/configuracao/dtos/i-produto"

class ProdutoRepository implements IProdutoRepository {
    private repository: Repository<Produto>

    constructor() {
        this.repository = getRepository(Produto)
    }

    // create
    async create({
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
    }: IProdutoDTO): Promise<HttpResponse> {
        try {
            const produto = this.repository.create({
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

            const result = await this.repository
                .save(produto)
                .then((produtoResult) => {
                    return ok(produtoResult)
                })
                .catch((error) => {
                    return serverError(error)
                })

            return result
        } catch (error) {
            return serverError(error)
        }
    }

    async createWithQueryRunner(
        {
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
        }: IProdutoDTO,
        transactionManager: EntityManager
    ): Promise<HttpResponse> {
        try {
            const produto = transactionManager.create(Produto, {
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

            const result = await transactionManager
                .save(produto)
                .then((produtoResult) => {
                    return ok(produtoResult)
                })
                .catch((error) => {
                    return serverError(error)
                })

            return result
        } catch (error) {
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

        const referenceArray = ["nome", "descricao"]
        const columnOrder = new Array<"ASC" | "DESC">(2).fill("ASC")

        const index = referenceArray.indexOf(columnName)

        columnOrder[index] = columnDirection

        const offset = rowsPerPage * page

        try {
            let query = this.repository
                .createQueryBuilder("prod")
                .select([
                    'prod.id as "id"',
                    'prod.nome as "nome"',
                    'prod.descricao as "descricao"',
                    "CASE WHEN prod.tipo = 0 THEN 'Peça Final' ELSE 'Kit' END as \"tipo\"",
                ])

            if (filter) {
                query = query.where(filter)
            }

            const produtos = await query
                .andWhere(
                    new Brackets((query) => {
                        query.andWhere("CAST(prod.nome AS VARCHAR) ilike :search", { search: `%${search}%` })
                        query.orWhere("CAST(prod.descricao AS VARCHAR) ilike :search", { search: `%${search}%` })
                    })
                )
                .addOrderBy("prod.nome", columnOrder[0])
                .addOrderBy("prod.descricao", columnOrder[1])
                .offset(offset)
                .limit(rowsPerPage)
                .take(rowsPerPage)
                .getRawMany()

            console.log("Produtos list:", produtos)

            return ok(produtos)
        } catch (err) {
            console.error("Error listing produtos:", err)
            return serverError(err)
        }
    }

    // select
    async select(filter: string): Promise<HttpResponse> {
        try {
            const tiposPorta = await this.repository
                .createQueryBuilder("tip")
                .select(['tip.id as "value"', 'tip.descricao as "label"'])
                .where("tip.descricao ilike :filter", { filter: `${filter}%` })
                .addOrderBy("tip.descricao")
                .getRawMany()

            return ok(tiposPorta)
        } catch (err) {
            return serverError(err)
        }
    }

    // id select
    async idSelect(id: string): Promise<HttpResponse> {
        try {
            const tipoPorta = await this.repository
                .createQueryBuilder("tip")
                .select(['tip.id as "value"', 'tip.descricao as "label"'])
                .where("tip.id = :id", { id: `${id}` })
                .getRawOne()

            return ok(tipoPorta)
        } catch (err) {
            return serverError(err)
        }
    }

    // count
    async count(search: string, filter: string): Promise<HttpResponse> {
        try {
            let query = this.repository.createQueryBuilder("tip").select(['tip.id as "id"'])

            if (filter) {
                query = query.where(filter)
            }

            const tiposPorta = await query
                .andWhere(
                    new Brackets((query) => {
                        query.andWhere("CAST(tip.nome AS VARCHAR) ilike :search", { search: `%${search}%` })
                        query.orWhere("CAST(tip.descricao AS VARCHAR) ilike :search", { search: `%${search}%` })
                    })
                )
                .getRawMany()

            return ok({ count: tiposPorta.length })
        } catch (err) {
            return serverError(err)
        }
    }

    // get
    async get(id: string): Promise<HttpResponse> {
        try {
            const tipoPorta = await this.repository
                .createQueryBuilder("tip")
                .select([
                    'tip.id as "id"',
                    'tip.nome as "nome"',
                    'tip.descricao as "descricao", tip.tipo as "tipo", tip.sentidoAbertura as "sentidoAbertura", tip.tipoPorta as "tipoPorta", tip.tipoEnchimento as "tipoEnchimento", tip.fechadura as "fechadura", tip.alturaPorta as "alturaPorta", tip.larguraPorta as "larguraPorta", tip.espessuraPorta as "espessuraPorta", tip.larguraBatatente as "larguraBatatente", tip.espessuraCanalAlizar as "espessuraCanalAlizar"',
                ])
                .where("tip.id = :id", { id })
                .getRawOne()

            if (typeof tipoPorta === "undefined") {
                return noContent()
            }

            return ok(tipoPorta)
        } catch (err) {
            return serverError(err)
        }
    }

    // update
    async update({ id, nome, descricao }: ITipoPortaDTO): Promise<HttpResponse> {
        const tipoPorta = await this.repository.findOne(id)

        if (!tipoPorta) {
            return notFound()
        }

        const newtipoPorta = this.repository.create({
            id,
            nome,
            descricao,
        })

        try {
            await this.repository.save(newtipoPorta)

            return ok(newtipoPorta)
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

export { ProdutoRepository }
