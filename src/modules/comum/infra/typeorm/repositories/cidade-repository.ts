import { Brackets, getRepository, Repository } from "typeorm"
import { ICidadeDTO } from "@modules/comum/dtos/i-cidade-dto"
import { ICidadeRepository } from "@modules/comum/repositories/i-cidade-repository"
import { Cidade } from "@modules/comum/infra/typeorm/entities/cidade"
import { noContent, serverError, ok, notFound, HttpResponse } from "@shared/helpers"
import { AppError } from "@shared/errors/app-error"

class CidadeRepository implements ICidadeRepository {
  private repository: Repository<Cidade>

  constructor() {
    this.repository = getRepository(Cidade)
  }

  // create
  async create({ estadoId, codigoIbge, nomeCidade }: ICidadeDTO): Promise<HttpResponse> {
    const cidade = this.repository.create({
      estadoId,
      codigoIbge,
      nomeCidade,
    })

    const result = await this.repository
      .save(cidade)
      .then((cidadeResult) => {
        return ok(cidadeResult)
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

    const referenceArray = ["estadoUf", "nomeCidade"]
    const columnOrder = new Array<"ASC" | "DESC">(2).fill("ASC")

    const index = referenceArray.indexOf(columnName)

    columnOrder[index] = columnDirection

    const offset = rowsPerPage * page

    try {
      let query = this.repository
        .createQueryBuilder("cid")
        .select(['cid.id as "id"', 'a.id as "estadoId"', 'a.uf as "estadoUf"', 'cid.nomeCidade as "nomeCidade"'])
        .leftJoin("cid.estadoId", "a")

      if (filter) {
        query = query.where(filter)
      }

      const cidades = await query
        .andWhere(
          new Brackets((query) => {
            query.andWhere("CAST(a.uf AS VARCHAR) ilike :search", { search: `%${search}%` })
            query.orWhere("CAST(cid.nomeCidade AS VARCHAR) ilike :search", { search: `%${search}%` })
          })
        )
        .addOrderBy("a.uf", columnOrder[0])
        .addOrderBy("cid.nomeCidade", columnOrder[1])
        .offset(offset)
        .limit(rowsPerPage)
        .take(rowsPerPage)
        .getRawMany()

      return ok(cidades)
    } catch (err) {
      return serverError(err)
    }
  }

  // select
  async select(filter: string, estadoId): Promise<HttpResponse> {
    try {
      const cidades = await this.repository
        .createQueryBuilder("cid")
        .select(['cid.id as "value"', 'cid.nomeCidade as "label"'])
        .where("cid.estadoId = :estadoId", { estadoId: `${estadoId}` })
        .andWhere("cid.nomeCidade ilike :filter", { filter: `${filter}%` })
        .addOrderBy("cid.nomeCidade")
        .getRawMany()

      return ok(cidades)
    } catch (err) {
      return serverError(err)
    }
  }

  // id select
  async idSelect(id: string): Promise<HttpResponse> {
    try {
      const cidade = await this.repository
        .createQueryBuilder("cid")
        .select(['cid.id as "value"', 'cid.nomeCidade as "label"'])
        .where("cid.id = :id", { id: `${id}` })
        .getRawOne()

      return ok(cidade)
    } catch (err) {
      return serverError(err)
    }
  }

  // count
  async count(search: string, filter: string): Promise<HttpResponse> {
    try {
      let query = this.repository.createQueryBuilder("cid").select(['cid.id as "id"']).leftJoin("cid.estadoId", "a")

      if (filter) {
        query = query.where(filter)
      }

      const cidades = await query
        .andWhere(
          new Brackets((query) => {
            query.andWhere("CAST(a.uf AS VARCHAR) ilike :search", { search: `%${search}%` })
            query.orWhere("CAST(cid.nomeCidade AS VARCHAR) ilike :search", { search: `%${search}%` })
          })
        )
        .getRawMany()

      return ok({ count: cidades.length })
    } catch (err) {
      return serverError(err)
    }
  }

  // get
  async get(id: string): Promise<HttpResponse> {
    try {
      const cidade = await this.repository
        .createQueryBuilder("cid")
        .select(['cid.id as "id"', 'cid.estadoId as "estadoId"', 'a.uf as "estadoUf"', 'cid.codigoIbge as "codigoIbge"', 'cid.nomeCidade as "nomeCidade"'])
        .leftJoin("cid.estadoId", "a")
        .where("cid.id = :id", { id })
        .getRawOne()

      if (typeof cidade === "undefined") {
        return noContent()
      }

      return ok(cidade)
    } catch (err) {
      return serverError(err)
    }
  }

  // update
  async update({ id, estadoId, codigoIbge, nomeCidade }: ICidadeDTO): Promise<HttpResponse> {
    const cidade = await this.repository.findOne(id)

    if (!cidade) {
      return notFound()
    }

    const newcidade = this.repository.create({
      id,
      estadoId,
      codigoIbge,
      nomeCidade,
    })

    try {
      await this.repository.save(newcidade)

      return ok(newcidade)
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

export { CidadeRepository }
