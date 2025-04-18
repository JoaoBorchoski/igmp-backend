import { Brackets, getRepository, Repository } from "typeorm"
import { IMedicaoDTO } from "@modules/operacao/dtos/i-medicao-dto"
import { IMedicaoRepository } from "@modules/operacao/repositories/i-medicao-repository"
import { Medicao } from "@modules/operacao/infra/typeorm/entities/medicao"
import { noContent, serverError, ok, notFound, HttpResponse } from "@shared/helpers"
import { AppError } from "@shared/errors/app-error"

class MedicaoRepository implements IMedicaoRepository {
  private repository: Repository<Medicao>

  constructor() {
    this.repository = getRepository(Medicao)
  }

  // create
  async create({
    cadastroObraId,
    complemento,
    espessuraParede,
    larguraVaosId,
    alturaVaosId,
    tipoEnchimentoId,
    tipoPortaId,
    confirmacao,
    complementoOrigemId,
    sentidoAberturaId,
    alizarId,
    fechaduraId,
  }: IMedicaoDTO): Promise<HttpResponse> {
    const medicao = this.repository.create({
      cadastroObraId,
      complemento,
      espessuraParede,
      larguraVaosId,
      alturaVaosId,
      tipoEnchimentoId,
      tipoPortaId,
      confirmacao,
      sentidoAberturaId,
      alizarId,
      fechaduraId,
    })

    const result = await this.repository
      .save(medicao)
      .then((medicaoResult) => {
        return ok(medicaoResult)
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

    const referenceArray = []
    const columnOrder = new Array<"ASC" | "DESC">(2).fill("ASC")

    const index = referenceArray.indexOf(columnName)

    columnOrder[index] = columnDirection

    const offset = rowsPerPage * page

    try {
      let query = this.repository
        .createQueryBuilder("med")
        .select(['med.id as "id", med.cadastroObraId as "obraId", med.complemento as "complemento", obra.nome as "obra"'])

      if (filter) {
        query = query.where(filter)
      }

      const medicoes = await query
        .andWhere(
          new Brackets((query) => {
            query.andWhere("CAST(med.complemento AS VARCHAR) ilike :search", { search: `%${search}%` })
          })
        )
        .leftJoin("med.cadastroObraId", "obra")
        .offset(offset)
        .limit(rowsPerPage)
        .take(rowsPerPage)
        .getRawMany()

      console.log(medicoes)

      return ok(medicoes)
    } catch (err) {
      console.log(err.message, err.stack)
      return serverError(err)
    }
  }

  // select
  async select(filter: string): Promise<HttpResponse> {
    try {
      const medicoes = await this.repository
        .createQueryBuilder("med")
        .select(['med.id as "value"', 'med.obraId as "label"'])
        .where("med.obraId ilike :filter", { filter: `${filter}%` })
        .addOrderBy("med.obraId")
        .getRawMany()

      return ok(medicoes)
    } catch (err) {
      return serverError(err)
    }
  }

  // id select
  async idSelect(id: string): Promise<HttpResponse> {
    try {
      const medicao = await this.repository
        .createQueryBuilder("med")
        .select(['med.id as "value"', 'med.obraId as "label"'])
        .where("med.id = :id", { id: `${id}` })
        .getRawOne()

      return ok(medicao)
    } catch (err) {
      return serverError(err)
    }
  }

  // count
  async count(search: string, filter: string): Promise<HttpResponse> {
    try {
      let query = this.repository.createQueryBuilder("med").select(['med.id as "id"'])

      if (filter) {
        query = query.where(filter)
      }

      const medicoes = await query
        .andWhere(
          new Brackets((query) => {
            query.andWhere("CAST(med. AS VARCHAR) ilike :search", { search: `%${search}%` })
          })
        )
        .getRawMany()

      return ok({ count: medicoes.length })
    } catch (err) {
      return serverError(err)
    }
  }

  // get
  async get(id: string): Promise<HttpResponse> {
    try {
      const medicao = await this.repository
        .createQueryBuilder("med")
        .select([
          'med.id as "id"',
          'med.cadastroObraId as "obraId"',
          'a.nome as "Nome"',
          'med.complemento as "complemento"',
          'med.espessuraParede as "espessuraParede"',
          'med.larguraVaosId as "larguraVaosId"',
          'med.alturaVaosId as "alturaVaosId"',
          'med.tipoEnchimentoId as "tipoEnchimentoId"',
          'd.descricao as "tipoEnchimentoDescricao"',
          'med.tipoPortaId as "tipoPortaId"',
          'e.descricao as "tipoPortaDescricao"',
          'med.confirmacao as "confirmacao"',
          'med.sentidoAberturaId as "sentidoAberturaId"',
          'g.descricao as "sentidoAberturaDescricao"',
          'med.alizarId as "alizarId"',
          'h.descricao as "alizarDescricao"',
          'med.fechaduraId as "fechaduraId"',
          'i.descricao as "fechaduraDescricao"',
        ])
        .leftJoin("med.cadastroObraId", "a")
        .leftJoin("med.larguraVaosId", "b")
        .leftJoin("med.alturaVaosId", "c")
        .leftJoin("med.tipoEnchimentoId", "d")
        .leftJoin("med.tipoPortaId", "e")
        .leftJoin("med.sentidoAberturaId", "g")
        .leftJoin("med.alizarId", "h")
        .leftJoin("med.fechaduraId", "i")
        .where("med.id = :id", { id })
        .getRawOne()

      if (typeof medicao === "undefined") {
        return noContent()
      }

      return ok(medicao)
    } catch (err) {
      return serverError(err)
    }
  }

  // update
  async update({
    id,
    cadastroObraId,
    complemento,
    espessuraParede,
    larguraVaosId,
    alturaVaosId,
    tipoEnchimentoId,
    tipoPortaId,
    confirmacao,
    complementoOrigemId,
    sentidoAberturaId,
    alizarId,
    fechaduraId,
  }: IMedicaoDTO): Promise<HttpResponse> {
    const medicao = await this.repository.findOne(id)

    if (!medicao) {
      return notFound()
    }

    const newmedicao = this.repository.create({
      id,
      cadastroObraId,
      complemento,
      espessuraParede,
      larguraVaosId,
      alturaVaosId,
      tipoEnchimentoId,
      tipoPortaId,
      confirmacao,
      sentidoAberturaId,
      alizarId,
      fechaduraId,
    })

    try {
      await this.repository.save(newmedicao)

      return ok(newmedicao)
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

export { MedicaoRepository }
