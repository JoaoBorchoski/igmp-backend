import { Brackets, getRepository, Repository } from "typeorm"
import { ICadastroObraDTO } from "@modules/operacao/dtos/i-cadastro-obra-dto"
import { ICadastroObraRepository } from "@modules/operacao/repositories/i-cadastro-obra-repository"
import { CadastroObra } from "@modules/operacao/infra/typeorm/entities/cadastro-obra"
import { noContent, serverError, ok, notFound, HttpResponse } from "@shared/helpers"
import { AppError } from "@shared/errors/app-error"

class CadastroObraRepository implements ICadastroObraRepository {
  private repository: Repository<CadastroObra>

  constructor() {
    this.repository = getRepository(CadastroObra)
  }

  // create
  async create({
    nome,
    cliente,
    cnpj,
    endereco,
    responsavelObra,
    contato,
    previsaoEntrega,
    tipoObra,
    plantasIguais,
    qtdCasas,
    grupoCasas,
    estruturaPredio,
    qtdAptoPorAndar,
    andares,
    qtdAptos,
    grupoAndares,
    padraoCorId,
    solidaMadeirada,
    coresTiposId,
  }: ICadastroObraDTO): Promise<HttpResponse> {
    const cadastroObra = this.repository.create({
      nome,
      cliente,
      cnpj,
      endereco,
      responsavelObra,
      contato,
      previsaoEntrega,
      tipoObra,
      plantasIguais,
      qtdCasas,
      grupoCasas,
      estruturaPredio,
      qtdAptoPorAndar,
      andares,
      qtdAptos,
      grupoAndares,
      padraoCorId,
      solidaMadeirada,
    })

    const result = await this.repository
      .save(cadastroObra)
      .then((cadastroObraResult) => {
        return ok(cadastroObraResult)
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

    const referenceArray = ["nome", "cnpj", "endereco", "responsavelObra", "contato", "tipoObra"]
    const columnOrder = new Array<"ASC" | "DESC">(2).fill("ASC")

    const index = referenceArray.indexOf(columnName)

    columnOrder[index] = columnDirection

    const offset = rowsPerPage * page

    try {
      let query = this.repository
        .createQueryBuilder("cad")
        .select([
          'cad.id as "id"',
          'cad.nome as "nome"',
          'cli.nome as "clienteNome"',
          'cli.id as "clienteId"',
          'cad.cnpj as "cnpj"',
          'cad.endereco as "endereco"',
          'cad.responsavelObra as "responsavelObra"',
          'cad.contato as "contato"',
          'cad.tipoObra as "tipoObra"',
        ])

      if (filter) {
        query = query.where(filter)
      }

      const cadastroObras = await query
        .andWhere(
          new Brackets((query) => {
            query.andWhere("CAST(cad.nome AS VARCHAR) ilike :search", { search: `%${search}%` })
            query.orWhere("CAST(cad.cnpj AS VARCHAR) ilike :search", { search: `%${search}%` })
            query.orWhere("CAST(cad.endereco AS VARCHAR) ilike :search", { search: `%${search}%` })
            query.orWhere("CAST(cad.responsavelObra AS VARCHAR) ilike :search", { search: `%${search}%` })
            query.orWhere("CAST(cad.contato AS VARCHAR) ilike :search", { search: `%${search}%` })
            query.orWhere("CAST(cad.tipoObra AS VARCHAR) ilike :search", { search: `%${search}%` })
          })
        )
        .leftJoin("clientes", "cli", "cad.cliente = cli.id")
        .addOrderBy("cad.nome", columnOrder[0])
        .addOrderBy("cad.cnpj", columnOrder[1])
        .addOrderBy("cad.endereco", columnOrder[2])
        .addOrderBy("cad.responsavelObra", columnOrder[3])
        .addOrderBy("cad.contato", columnOrder[4])
        .addOrderBy("cad.tipoObra", columnOrder[5])
        .offset(offset)
        .limit(rowsPerPage)
        .take(rowsPerPage)
        .getRawMany()

      return ok(cadastroObras)
    } catch (err) {
      return serverError(err)
    }
  }

  // select
  async select(filter: string): Promise<HttpResponse> {
    try {
      const cadastroObras = await this.repository
        .createQueryBuilder("cad")
        .select(['cad.id as "value"', 'cad.nome as "label"'])
        .where("cad.nome ilike :filter", { filter: `${filter}%` })
        .addOrderBy("cad.nome")
        .getRawMany()

      return ok(cadastroObras)
    } catch (err) {
      return serverError(err)
    }
  }

  // id select
  async idSelect(id: string): Promise<HttpResponse> {
    try {
      const cadastroObra = await this.repository
        .createQueryBuilder("cad")
        .select(['cad.id as "value"', 'cad.nome as "label"'])
        .where("cad.id = :id", { id: `${id}` })
        .getRawOne()

      return ok(cadastroObra)
    } catch (err) {
      return serverError(err)
    }
  }

  // count
  async count(search: string, filter: string): Promise<HttpResponse> {
    try {
      let query = this.repository.createQueryBuilder("cad").select(['cad.id as "id"'])

      if (filter) {
        query = query.where(filter)
      }

      const cadastroObras = await query
        .andWhere(
          new Brackets((query) => {
            query.andWhere("CAST(cad.nome AS VARCHAR) ilike :search", { search: `%${search}%` })
            query.orWhere("CAST(cad.cnpj AS VARCHAR) ilike :search", { search: `%${search}%` })
            query.orWhere("CAST(cad.endereco AS VARCHAR) ilike :search", { search: `%${search}%` })
            query.orWhere("CAST(cad.responsavelObra AS VARCHAR) ilike :search", { search: `%${search}%` })
            query.orWhere("CAST(cad.contato AS VARCHAR) ilike :search", { search: `%${search}%` })
            query.orWhere("CAST(cad.tipoObra AS VARCHAR) ilike :search", { search: `%${search}%` })
          })
        )
        .getRawMany()

      return ok({ count: cadastroObras.length })
    } catch (err) {
      return serverError(err)
    }
  }

  // get
  async get(id: string): Promise<HttpResponse> {
    try {
      const cadastroObra = await this.repository
        .createQueryBuilder("cad")
        .select([
          'cad.id as "id"',
          'cad.nome as "nome"',
          'cad.cnpj as "cnpj"',
          'cad.endereco as "endereco"',
          'cad.responsavelObra as "responsavelObra"',
          'cad.contato as "contato"',
          'cad.previsaoEntrega as "previsaoEntrega"',
          'cad.tipoObra as "tipoObra"',
          'cad.plantasIguais as "plantasIguais"',
          'cad.qtdCasas as "qtdCasas"',
          'cad.grupoCasas as "grupoCasas"',
          'cad.estruturaPredio as "estruturaPredio"',
          'cad.qtdAptoPorAndar as "qtdAptoPorAndar"',
          'cad.andares as "andares"',
          'cad.qtdAptos as "qtdAptos"',
          'cad.grupoAndares as "grupoAndares"',
          'cad.padraoCorId as "padraoCorId"',
          'a.nome as "padraoCorNome"',
          'cad.solidaMadeirada as "solidaMadeirada"',
          'cad.cliente as "cliente"',
        ])
        .leftJoin("cad.padraoCorId", "a")
        .where("cad.id = :id", { id })
        .getRawOne()

      if (typeof cadastroObra === "undefined") {
        return noContent()
      }

      return ok(cadastroObra)
    } catch (err) {
      return serverError(err)
    }
  }

  // update
  async update({
    id,
    nome,
    cliente,
    cnpj,
    endereco,
    responsavelObra,
    contato,
    previsaoEntrega,
    tipoObra,
    plantasIguais,
    qtdCasas,
    grupoCasas,
    estruturaPredio,
    qtdAptoPorAndar,
    andares,
    qtdAptos,
    grupoAndares,
    padraoCorId,
    solidaMadeirada,
    coresTiposId,
  }: ICadastroObraDTO): Promise<HttpResponse> {
    const cadastroObra = await this.repository.findOne(id)

    if (!cadastroObra) {
      return notFound()
    }

    const newcadastroObra = this.repository.create({
      id,
      nome,
      cliente,
      cnpj,
      endereco,
      responsavelObra,
      contato,
      previsaoEntrega,
      tipoObra,
      plantasIguais,
      qtdCasas,
      grupoCasas,
      estruturaPredio,
      qtdAptoPorAndar,
      andares,
      qtdAptos,
      grupoAndares,
      padraoCorId,
      solidaMadeirada,
    })

    try {
      await this.repository.save(newcadastroObra)

      return ok(newcadastroObra)
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

export { CadastroObraRepository }
