import { inject, injectable } from 'tsyringe'
import { IFilterRepository } from '@modules/security/repositories/i-filter-repository'

interface ResponseProps {
  items?: object[]
  hasNext?: boolean
  value?: string
  label?: string
}

@injectable()
class SelectFilterUseCase {
  constructor(@inject('FilterRepository')
    private filterRepository: IFilterRepository
  ) {}

  async execute({ table, user }): Promise<ResponseProps> {
    const filters = await this.filterRepository.select(table, user)

    const newFilters = {
      items: filters.data,
      hasNext: false
    }

    return newFilters
  }
}

export { SelectFilterUseCase }
