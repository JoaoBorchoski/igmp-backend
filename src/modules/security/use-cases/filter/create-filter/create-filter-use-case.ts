import { inject, injectable } from 'tsyringe'
import { Filter } from '@modules/security/infra/typeorm/entities/filter'
import { IFilterRepository } from '@modules/security/repositories/i-filter-repository'
import { AppError } from '@shared/errors/app-error'

interface IRequest {
  name: string
  expression: string
  table: string
  userId: string
}

@injectable()
class CreateFilterUseCase {
  constructor(@inject('FilterRepository')
    private filterRepository: IFilterRepository
  ) {}

  async execute({
    name,
    expression,
    table,
    userId
  }: IRequest): Promise<Filter> {
    const result = await this.filterRepository.create({
        name,
        expression,
        table,
        userId
      })
      .then(filterResult => {
        return filterResult
      })
      .catch(error => {
        return error
      })

    return result
  }
}

export { CreateFilterUseCase }
