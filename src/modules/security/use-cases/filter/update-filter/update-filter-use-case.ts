import { inject, injectable } from 'tsyringe'
import { IFilterRepository } from '@modules/security/repositories/i-filter-repository'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  id: string
  name: string
  expression: string
  table: string
  userId: string
}

@injectable()
class UpdateFilterUseCase {
  constructor(@inject('FilterRepository')
    private filterRepository: IFilterRepository
  ) {}

  async execute({
    id,
    name,
    expression,
    table,
    userId
  }: IRequest): Promise<HttpResponse> {
    const filter = await this.filterRepository.update({
      id,
      name,
      expression,
      table,
      userId
    })

    return filter
  }
}

export { UpdateFilterUseCase }
