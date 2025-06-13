import { Brackets, getRepository, Repository } from "typeorm"
import { IEstadoDTO } from "@modules/comum/dtos/i-estado-dto"
import { IEstadoRepository } from "@modules/comum/repositories/i-estado-repository"
import { Estado } from "@modules/comum/infra/typeorm/entities/estado"
import { noContent, serverError, ok, notFound, HttpResponse } from "@shared/helpers"
import { AppError } from "@shared/errors/app-error"

class EstadoRepository implements IEstadoRepository {
    private repository: Repository<Estado>

    constructor() {
        this.repository = getRepository(Estado)
    }

    // create
    async create({ codigoIbge, uf, nomeEstado }: IEstadoDTO): Promise<HttpResponse> {
        const estado = this.repository.create({
            codigoIbge,
            uf,
            nomeEstado,
        })

        const result = await this.repository
            .save(estado)
            .then((estadoResult) => {
                return ok(estadoResult)
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

        const referenceArray = ["uf", "nomeEstado"]
        const columnOrder = new Array<"ASC" | "DESC">(2).fill("ASC")

        const index = referenceArray.indexOf(columnName)

        columnOrder[index] = columnDirection

        const offset = rowsPerPage * page

        try {
            let query = this.repository
                .createQueryBuilder("est")
                .select(['est.id as "id"', 'est.uf as "uf"', 'est.nomeEstado as "nomeEstado"'])

            if (filter) {
                query = query.where(filter)
            }

            const estados = await query
                .andWhere(
                    new Brackets((query) => {
                        query.andWhere("CAST(est.uf AS VARCHAR) ilike :search", { search: `%${search}%` })
                        query.orWhere("CAST(est.nomeEstado AS VARCHAR) ilike :search", { search: `%${search}%` })
                    })
                )
                .addOrderBy("est.uf", columnOrder[0])
                .addOrderBy("est.nomeEstado", columnOrder[1])
                .offset(offset)
                .limit(rowsPerPage)
                .take(rowsPerPage)
                .getRawMany()

            return ok(estados)
        } catch (err) {
            return serverError(err)
        }
    }

    // select
    async select(filter: string): Promise<HttpResponse> {
        try {
            const estados = await this.repository
                .createQueryBuilder("est")
                .select(['est.id as "value"', 'est.uf as "label"'])
                .where("est.uf ilike :filter", { filter: `${filter}%` })
                .addOrderBy("est.uf")
                .getRawMany()

            return ok(estados)
        } catch (err) {
            return serverError(err)
        }
    }

    // id select
    async idSelect(id: string): Promise<HttpResponse> {
        try {
            const estado = await this.repository
                .createQueryBuilder("est")
                .select(['est.id as "value"', 'est.uf as "label"'])
                .where("est.id = :id", { id: `${id}` })
                .getRawOne()

            return ok(estado)
        } catch (err) {
            return serverError(err)
        }
    }

    // count
    async count(search: string, filter: string): Promise<HttpResponse> {
        try {
            let query = this.repository.createQueryBuilder("est").select(['est.id as "id"'])

            if (filter) {
                query = query.where(filter)
            }

            const estados = await query
                .andWhere(
                    new Brackets((query) => {
                        query.andWhere("CAST(est.uf AS VARCHAR) ilike :search", { search: `%${search}%` })
                        query.orWhere("CAST(est.nomeEstado AS VARCHAR) ilike :search", { search: `%${search}%` })
                    })
                )
                .getRawMany()

            return ok({ count: estados.length })
        } catch (err) {
            return serverError(err)
        }
    }

    // get
    async get(id: string): Promise<HttpResponse> {
        try {
            const estado = await this.repository
                .createQueryBuilder("est")
                .select(['est.id as "id"', 'est.codigoIbge as "codigoIbge"', 'est.uf as "uf"', 'est.nomeEstado as "nomeEstado"'])
                .where("est.id = :id", { id })
                .getRawOne()

            if (typeof estado === "undefined") {
                return noContent()
            }

            return ok(estado)
        } catch (err) {
            return serverError(err)
        }
    }

    // update
    async update({ id, codigoIbge, uf, nomeEstado }: IEstadoDTO): Promise<HttpResponse> {
        const estado = await this.repository.findOne(id)

        if (!estado) {
            return notFound()
        }

        const newestado = this.repository.create({
            id,
            codigoIbge,
            uf,
            nomeEstado,
        })

        try {
            await this.repository.save(newestado)

            return ok(newestado)
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

    async getByName(nomeEstado: string): Promise<HttpResponse> {
        try {
            const estado = await this.repository
                .createQueryBuilder("est")
                .select(['est.id as "id"', 'est.codigoIbge as "codigoIbge"', 'est.uf as "uf"', 'est.nomeEstado as "nomeEstado"'])
                .where("est.nomeEstado ilike :nomeEstado", { nomeEstado: `%${nomeEstado}%` })
                .orWhere("est.uf ilike :nomeEstado", { nomeEstado: `%${nomeEstado}%` })
                .getRawOne()

            if (typeof estado === "undefined") {
                return await this.repository
                    .createQueryBuilder("est")
                    .select([
                        'est.id as "id"',
                        'est.codigoIbge as "codigoIbge"',
                        'est.uf as "uf"',
                        'est.nomeEstado as "nomeEstado"',
                    ])
                    .where("est.id = 'de12c2b4-b75d-4ec2-adfa-d6910396328e'")
                    .getRawOne()
            }

            return ok(estado)
        } catch (err) {
            return serverError(err)
        }
    }
}

export { EstadoRepository }
