import { Brackets, getRepository, Repository } from 'typeorm'
import { IFuncionarioDTO } from '@modules/configuracao/dtos/i-funcionario-dto'
import { IFuncionarioRepository } from '@modules/configuracao/repositories/i-funcionario-repository'
import { Funcionario } from '@modules/configuracao/infra/typeorm/entities/funcionario'
import { noContent, serverError, ok, notFound, HttpResponse } from '@shared/helpers'
import { AppError } from '@shared/errors/app-error'

class FuncionarioRepository implements IFuncionarioRepository {
  private repository: Repository<Funcionario>

  constructor() {
    this.repository = getRepository(Funcionario)
  }


  // create
  async create ({
    nome,
    cpf,
    rg,
    email,
    cep,
    paisId,
    estadoId,
    cidadeId,
    bairro,
    endereco,
    numero,
    complemento,
    telefone,
    observacoes,
    usuarioId,
    desabilitado
  }: IFuncionarioDTO): Promise<HttpResponse> {
    const funcionario = this.repository.create({
      nome,
      cpf,
      rg,
      email,
      cep,
      paisId,
      estadoId,
      cidadeId,
      bairro,
      endereco,
      numero,
      complemento,
      telefone,
      observacoes,
      usuarioId,
      desabilitado
    })

    const result = await this.repository.save(funcionario)
      .then(funcionarioResult => {
        return ok(funcionarioResult)
      })
      .catch(error => {
        return serverError(error)
      })

    return result
  }


  // list
  async list (
    search: string,
    page: number,
    rowsPerPage: number,
    order: string,
    filter: string
  ): Promise<HttpResponse> {
    let columnName: string
    let columnDirection: 'ASC' | 'DESC'

    if ((typeof(order) === 'undefined') || (order === "")) {
      columnName = 'nome'
      columnDirection = 'ASC'
    } else {
      columnName = order.substring(0, 1) === '-' ? order.substring(1) : order
      columnDirection = order.substring(0, 1) === '-' ? 'DESC' : 'ASC'
    }

    const referenceArray = [
      "nome",
      "cpf",
      "email",
    ]
    const columnOrder = new Array<'ASC' | 'DESC'>(2).fill('ASC')

    const index = referenceArray.indexOf(columnName)

    columnOrder[index] = columnDirection

    const offset = rowsPerPage * page

    try {
      let query = this.repository.createQueryBuilder('fun')
        .select([
          'fun.id as "id"',
          'fun.nome as "nome"',
          'fun.cpf as "cpf"',
          'fun.email as "email"',
        ])

      if (filter) {
        query = query
          .where(filter)
      }

      const funcionarios = await query
        .andWhere(new Brackets(query => {
          query.andWhere('CAST(fun.nome AS VARCHAR) ilike :search', { search: `%${search}%` })
          query.orWhere('CAST(fun.cpf AS VARCHAR) ilike :search', { search: `%${search}%` })
          query.orWhere('CAST(fun.email AS VARCHAR) ilike :search', { search: `%${search}%` })
        }))
        .addOrderBy('fun.nome', columnOrder[0])
        .addOrderBy('fun.cpf', columnOrder[1])
        .addOrderBy('fun.email', columnOrder[2])
        .offset(offset)
        .limit(rowsPerPage)
        .take(rowsPerPage)
        .getRawMany()

      return ok(funcionarios)
    } catch (err) {
      return serverError(err)
    }
  }


  // select
  async select (filter: string): Promise<HttpResponse> {
    try {
      const funcionarios = await this.repository.createQueryBuilder('fun')
        .select([
          'fun.id as "value"',
          'fun.nome as "label"',
        ])
        .where('fun.nome ilike :filter', { filter: `${filter}%` })
        .addOrderBy('fun.nome')
        .getRawMany()

      return ok(funcionarios)
    } catch (err) {
      return serverError(err)
    }
  }


  // id select
  async idSelect (id: string): Promise<HttpResponse> {
    try {
      const funcionario = await this.repository.createQueryBuilder('fun')
        .select([
          'fun.id as "value"',
          'fun.nome as "label"',
        ])
        .where('fun.id = :id', { id: `${id}` })
        .getRawOne()

      return ok(funcionario)
    } catch (err) {
      return serverError(err)
    }
  }


  // count
  async count (
    search: string,
    filter: string
  ): Promise<HttpResponse> {
    try {
      let query = this.repository.createQueryBuilder('fun')
        .select([
          'fun.id as "id"',
        ])

      if (filter) {
        query = query
          .where(filter)
      }

      const funcionarios = await query
        .andWhere(new Brackets(query => {
          query.andWhere('CAST(fun.nome AS VARCHAR) ilike :search', { search: `%${search}%` })
          query.orWhere('CAST(fun.cpf AS VARCHAR) ilike :search', { search: `%${search}%` })
          query.orWhere('CAST(fun.email AS VARCHAR) ilike :search', { search: `%${search}%` })
        }))
        .getRawMany()

      return ok({ count: funcionarios.length })
    } catch (err) {
      return serverError(err)
    }
  }


  // get
  async get (id: string): Promise<HttpResponse> {
    try {
      const funcionario = await this.repository.createQueryBuilder('fun')
        .select([
          'fun.id as "id"',
          'fun.nome as "nome"',
          'fun.cpf as "cpf"',
          'fun.rg as "rg"',
          'fun.email as "email"',
          'fun.cep as "cep"',
          'fun.paisId as "paisId"',
          'a.nomePais as "paisNomePais"',
          'fun.estadoId as "estadoId"',
          'b.uf as "estadoUf"',
          'fun.cidadeId as "cidadeId"',
          'c.nomeCidade as "cidadeNomeCidade"',
          'fun.bairro as "bairro"',
          'fun.endereco as "endereco"',
          'fun.numero as "numero"',
          'fun.complemento as "complemento"',
          'fun.telefone as "telefone"',
          'fun.observacoes as "observacoes"',
          'fun.usuarioId as "usuarioId"',
          'fun.desabilitado as "desabilitado"',
        ])
        .leftJoin('fun.paisId', 'a')
        .leftJoin('fun.estadoId', 'b')
        .leftJoin('fun.cidadeId', 'c')
        .where('fun.id = :id', { id })
        .getRawOne()

      if (typeof funcionario === 'undefined') {
        return noContent()
      }

      return ok(funcionario)
    } catch (err) {
      return serverError(err)
    }
  }


  // update
  async update ({
    id,
    nome,
    cpf,
    rg,
    email,
    cep,
    paisId,
    estadoId,
    cidadeId,
    bairro,
    endereco,
    numero,
    complemento,
    telefone,
    observacoes,
    usuarioId,
    desabilitado
  }: IFuncionarioDTO): Promise<HttpResponse> {
    const funcionario = await this.repository.findOne(id)

    if (!funcionario) {
      return notFound()
    }

    const newfuncionario = this.repository.create({
      id,
      nome,
      cpf,
      rg,
      email,
      cep,
      paisId,
      estadoId,
      cidadeId,
      bairro,
      endereco,
      numero,
      complemento,
      telefone,
      observacoes,
      usuarioId,
      desabilitado
    })

    try {
      await this.repository.save(newfuncionario)

      return ok(newfuncionario)
    } catch (err) {
      return serverError(err)
    }
  }


  // delete
  async delete (id: string): Promise<HttpResponse> {
    try {
      await this.repository.delete(id)

      return noContent()
    } catch (err) {
      if(err.message.slice(0, 10) === 'null value') {
        throw new AppError('not null constraint', 404)
      }

      return serverError(err)
    }
  }


  // multi delete
  async multiDelete (ids: string[]): Promise<HttpResponse> {
    try {
      await this.repository.delete(ids)

      return noContent()
    } catch (err) {
      if(err.message.slice(0, 10) === 'null value') {
        throw new AppError('not null constraint', 404)
      }

      return serverError(err)
    }
  }
}

export { FuncionarioRepository }
