import { IBlockReasonDTO } from '@modules/security/dtos/i-block-reason-dto'
import { IBlockReasonRepository } from '@modules/security/repositories/i-block-reason-repository'
import { BlockReason } from '@modules/security/infra/typeorm/entities/block-reason'
import { ok, notFound, HttpResponse } from '@shared/helpers'

class BlockReasonRepositoryInMemory implements IBlockReasonRepository {
  blockReasons: BlockReason[] = []

  // create
  async create ({
    code,
    description,
    instructionsToSolve,
    isSolvedByPasswordReset,
    disabled
  }: IBlockReasonDTO): Promise<HttpResponse> {
    const blockReason = new BlockReason()

    Object.assign(blockReason, {
      code,
      description,
      instructionsToSolve,
      isSolvedByPasswordReset,
      disabled
    })

    this.blockReasons.push(blockReason)

    return ok(blockReason)
  }


  // list
  async list (
    search: string,
    page: number,
    rowsPerPage: number,
    order: string
  ): Promise<HttpResponse> {
    let filteredBlockReasons = this.blockReasons

    filteredBlockReasons = filteredBlockReasons.filter((blockReason) => {
      if (blockReason.code.includes(search)) return true
      if (blockReason.description.includes(search)) return true

      return false
    })

    return ok(filteredBlockReasons.slice((page - 1) * rowsPerPage, page * rowsPerPage))
  }


  // select
  async select (filter: string): Promise<HttpResponse> {
    let filteredBlockReasons = this.blockReasons

    filteredBlockReasons = filteredBlockReasons.filter((blockReason) => {
      if (blockReason.code.includes(filter)) return true
      if (blockReason.description.includes(filter)) return true

      return false
    })

    return ok(filteredBlockReasons)
  }


  // id select
  idSelect(id: string): Promise<HttpResponse<any>> {
    throw new Error('Method not implemented.')
  }


  // count
  async count (search: string,): Promise<HttpResponse> {
    let filteredBlockReasons = this.blockReasons

    filteredBlockReasons = filteredBlockReasons.filter((blockReason) => {
      if (blockReason.code.includes(search)) return true
      if (blockReason.description.includes(search)) return true

      return false
    })

    return ok(filteredBlockReasons.length)
  }


  // get
  async get (id: string): Promise<HttpResponse> {
    const blockReason = this.blockReasons.find((blockReason) => blockReason.id === id)

    if (typeof blockReason === 'undefined') {
      return notFound()
    } else {
      return ok(blockReason)
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
    const index = this.blockReasons.findIndex((blockReason) => blockReason.id === id)

    this.blockReasons[index].code = code
    this.blockReasons[index].description = description
    this.blockReasons[index].instructionsToSolve = instructionsToSolve
    this.blockReasons[index].isSolvedByPasswordReset = isSolvedByPasswordReset
    this.blockReasons[index].disabled = disabled

    return ok(this.blockReasons[index])
  }


  // delete
  async delete (id: string): Promise<HttpResponse> {
    const index = this.blockReasons.findIndex((blockReason) => blockReason.id === id)

    this.blockReasons.splice(index, 1)

    return ok(this.blockReasons)
  }


  // multi delete
  multiDelete(ids: string[]): Promise<HttpResponse<any>> {
    throw new Error('Method not implemented.')
  }
}

export { BlockReasonRepositoryInMemory }
