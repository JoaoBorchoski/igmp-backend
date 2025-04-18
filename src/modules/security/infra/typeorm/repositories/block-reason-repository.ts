import { getRepository, Repository } from 'typeorm'
import { IBlockReasonDTO } from '@modules/security/dtos/i-block-reason-dto'
import { IBlockReasonRepository } from '@modules/security/repositories/i-block-reason-repository'
import { BlockReason } from '@modules/security/infra/typeorm/entities/block-reason'
import { noContent, serverError, ok, notFound, HttpResponse } from '@shared/helpers'
import { AppError } from '@shared/errors/app-error'

class BlockReasonRepository implements IBlockReasonRepository {
  private repository: Repository<BlockReason>

  constructor() {
    this.repository = getRepository(BlockReason)
  }


  // create
  async create ({
    code,
    description,
    instructionsToSolve,
    isSolvedByPasswordReset,
    disabled
  }: IBlockReasonDTO): Promise<HttpResponse> {
    const blockReason = this.repository.create({
      code,
      description,
      instructionsToSolve,
      isSolvedByPasswordReset,
      disabled
    })

    const result = await this.repository.save(blockReason)
      .then(blockReasonResult => {
        return ok(blockReasonResult)
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
    filter?: string
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
      "code",
      "description"
    ]
    const columnOrder = new Array<'ASC' | 'DESC'>(2).fill('ASC')

    const index = referenceArray.indexOf(columnName)

    columnOrder[index] = columnDirection

    const offset = rowsPerPage * page

    try {
      let blockReasons = await this.repository.createQueryBuilder('blo')
        .select([
          'blo.id as "id"',
          'blo.code as "code"',
          'blo.description as "description"',
        ])
        .where('blo.code ilike :search', { search: `%${search}%` })
        .orWhere('blo.description ilike :search', { search: `%${search}%` })
        .addOrderBy('blo.code', columnOrder[0])
        .addOrderBy('blo.description', columnOrder[1])
        .take(rowsPerPage)
        .skip(offset)
        .getRawMany()

      // below statements are to solve typeorm bug related to use of leftjoins, filters, .take and .skip together

      if (blockReasons.length > rowsPerPage) {
        blockReasons = blockReasons.slice(offset, offset + rowsPerPage)
      }

      //

      return ok(blockReasons)
    } catch (err) {
      return serverError(err)
    }
  }


  // select
  async select (filter: string): Promise<HttpResponse> {
    try {
      const blockReasons = await this.repository.createQueryBuilder('blo')
        .select([
          'blo.id as "value"',
          'blo.description as "label"',
        ])
        .where('blo.description ilike :filter', { filter: `${filter}%` })
        .addOrderBy('blo.description')
        .getRawMany()

      return ok(blockReasons)
    } catch (err) {
      return serverError(err)
    }
  }


  // id select
  async idSelect (id: string): Promise<HttpResponse> {
    try {
      const blockReason = await this.repository.createQueryBuilder('blo')
        .select([
          'blo.id as "value"',
          'blo.description as "label"',
        ])
        .where('blo.id = :id', { id: `${id}` })
        .getRawOne()

      return ok(blockReason)
    } catch (err) {
      return serverError(err)
    }
  }


  // count
  async count (
    search: string,
    filter?: string
  ): Promise<HttpResponse> {
    try {
      const blockReasons = await this.repository.createQueryBuilder('blo')
        .select([
          'blo.id as "id"',
        ])
        .where('blo.code ilike :search', { search: `%${search}%` })
        .orWhere('blo.description ilike :search', { search: `%${search}%` })
        .getRawMany()

      return ok({ count: blockReasons.length })
    } catch (err) {
      return serverError(err)
    }
  }


  // get
  async get (id: string): Promise<HttpResponse> {
    try {
      const blockReason = await this.repository.findOne(id)

      if (typeof blockReason === 'undefined') {
        return noContent()
      }

      return ok(blockReason)
    } catch (err) {
      return serverError(err)
    }
  }


  // update
  async update ({
    id,
    code,
    description,
    instructionsToSolve,
    isSolvedByPasswordReset,
    disabled
  }: IBlockReasonDTO): Promise<HttpResponse> {
    const blockReason = await this.repository.findOne(id)

    if (!blockReason) {
      return notFound()
    }

    const newblockReason = this.repository.create({
      id,
      code,
      description,
      instructionsToSolve,
      isSolvedByPasswordReset,
      disabled
    })

    try {
      await this.repository.save(newblockReason)

      return ok(newblockReason)
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

export { BlockReasonRepository }
