import { inject, injectable } from 'tsyringe'
import { Filter } from '@modules/security/infra/typeorm/entities/filter'
import { IFilterRepository } from '@modules/security/repositories/i-filter-repository'
import { HttpResponse } from '@shared/helpers'

@injectable()
class DeleteFilterUseCase {
  constructor(@inject('FilterRepository')
    private filterRepository: IFilterRepository
  ) {}

  async execute(id: string): Promise<HttpResponse> {
    const filter = await this.filterRepository.delete(id)

    return filter
  }
}

export { DeleteFilterUseCase }
