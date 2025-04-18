import { inject, injectable } from 'tsyringe'
import { Filter } from '@modules/security/infra/typeorm/entities/filter'
import { IFilterRepository } from '@modules/security/repositories/i-filter-repository'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  search: string,
}

@injectable()
class CountFilterUseCase {
  constructor(@inject('FilterRepository')
    private filterRepository: IFilterRepository
  ) {}

  async execute({
    search
  }: IRequest): Promise<HttpResponse> {
    const filtersCount = await this.filterRepository.count(search)

    return filtersCount
  }
}

export { CountFilterUseCase }
