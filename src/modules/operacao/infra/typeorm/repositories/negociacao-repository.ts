import { Brackets, getRepository, Repository } from 'typeorm'
import { INegociacaoDTO } from '@modules/operacao/dtos/i-negociacao-dto'
import { INegociacaoRepository } from '@modules/operacao/repositories/i-negociacao-repository'
import { Negociacao } from '@modules/operacao/infra/typeorm/entities/negociacao'
import { noContent, serverError, ok, notFound, HttpResponse } from '@shared/helpers'
import { AppError } from '@shared/errors/app-error'

class NegociacaoRepository implements INegociacaoRepository {
  private repository: Repository<Negociacao>

  constructor() {
    this.repository = getRepository(Negociacao)
  }


  // create
  async create ({
    medicaoId,
    clienteId,
    statusNegociacaoId,
    funcionarioId,
    dataCriacao,
    dataFechamento,
    valorEstimado,
    descricao,
    motivoPerda
  }: INegociacaoDTO): Promise<HttpResponse> {
    const negociacao = this.repository.create({
      medicaoId,
      clienteId,
      statusNegociacaoId,
      funcionarioId,
      dataCriacao,
      dataFechamento,
      valorEstimado,
      descricao,
      motivoPerda
    })

    const result = await this.repository.save(negociacao)
      .then(negociacaoResult => {
        return ok(negociacaoResult)
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
    ]
    const columnOrder = new Array<'ASC' | 'DESC'>(2).fill('ASC')

    const index = referenceArray.indexOf(columnName)

    columnOrder[index] = columnDirection

    const offset = rowsPerPage * page

    try {
      let query = this.repository.createQueryBuilder('neg')
        .select([
          'neg.id as "id"',
        ])

      if (filter) {
        query = query
          .where(filter)
      }

      const negociacoes = await query
        .andWhere(new Brackets(query => {
          query.andWhere('CAST(neg. AS VARCHAR) ilike :search', { search: `%${search}%` })
        }))
        .offset(offset)
        .limit(rowsPerPage)
        .take(rowsPerPage)
        .getRawMany()

      return ok(negociacoes)
    } catch (err) {
      return serverError(err)
    }
  }


  // select
  async select (filter: string): Promise<HttpResponse> {
    try {
      const negociacoes = await this.repository.createQueryBuilder('neg')
        .select([
          'neg.id as "value"',
          'neg. as "label"',
        ])
        .where('neg. ilike :filter', { filter: `${filter}%` })
        .addOrderBy('neg.')
        .getRawMany()

      return ok(negociacoes)
    } catch (err) {
      return serverError(err)
    }
  }


  // id select
  async idSelect (id: string): Promise<HttpResponse> {
    try {
      const negociacao = await this.repository.createQueryBuilder('neg')
        .select([
          'neg.id as "value"',
          'neg. as "label"',
        ])
        .where('neg.id = :id', { id: `${id}` })
        .getRawOne()

      return ok(negociacao)
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
      let query = this.repository.createQueryBuilder('neg')
        .select([
          'neg.id as "id"',
        ])

      if (filter) {
        query = query
          .where(filter)
      }

      const negociacoes = await query
        .andWhere(new Brackets(query => {
          query.andWhere('CAST(neg. AS VARCHAR) ilike :search', { search: `%${search}%` })
        }))
        .getRawMany()

      return ok({ count: negociacoes.length })
    } catch (err) {
      return serverError(err)
    }
  }


  // get
  async get (id: string): Promise<HttpResponse> {
    try {
      const negociacao = await this.repository.createQueryBuilder('neg')
        .select([
          'neg.id as "id"',
          'neg.medicaoId as "medicaoId"',
          'a.obraId as "medicaoObraId"',
          'neg.clienteId as "clienteId"',
          'b.nome as "clienteNome"',
          'neg.statusNegociacaoId as "statusNegociacaoId"',
          'c.descricao as "statusNegociacaoDescricao"',
          'neg.funcionarioId as "funcionarioId"',
          'd.nome as "funcionarioNome"',
          'neg.dataCriacao as "dataCriacao"',
          'neg.dataFechamento as "dataFechamento"',
          'neg.valorEstimado as "valorEstimado"',
          'e. as ""',
          'neg.descricao as "descricao"',
          'neg.motivoPerda as "motivoPerda"',
        ])
        .leftJoin('neg.medicaoId', 'a')
        .leftJoin('neg.clienteId', 'b')
        .leftJoin('neg.statusNegociacaoId', 'c')
        .leftJoin('neg.funcionarioId', 'd')
        .leftJoin('neg.valorEstimado', 'e')
        .where('neg.id = :id', { id })
        .getRawOne()

      if (typeof negociacao === 'undefined') {
        return noContent()
      }

      return ok(negociacao)
    } catch (err) {
      return serverError(err)
    }
  }


  // update
  async update ({
    id,
    medicaoId,
    clienteId,
    statusNegociacaoId,
    funcionarioId,
    dataCriacao,
    dataFechamento,
    valorEstimado,
    descricao,
    motivoPerda
  }: INegociacaoDTO): Promise<HttpResponse> {
    const negociacao = await this.repository.findOne(id)

    if (!negociacao) {
      return notFound()
    }

    const newnegociacao = this.repository.create({
      id,
      medicaoId,
      clienteId,
      statusNegociacaoId,
      funcionarioId,
      dataCriacao,
      dataFechamento,
      valorEstimado,
      descricao,
      motivoPerda
    })

    try {
      await this.repository.save(newnegociacao)

      return ok(newnegociacao)
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

export { NegociacaoRepository }
