import { inject, injectable } from 'tsyringe'
import { IFilterRepository } from '@modules/security/repositories/i-filter-repository';
import { HttpResponse } from '@shared/helpers';

@injectable()
class MultiDeleteFilterUseCase {
  constructor(@inject('FilterRepository')
    private filterRepository: IFilterRepository
  ) {}

  async execute(ids: string[]): Promise<HttpResponse> {
    const filter = await this.filterRepository.multiDelete(ids)

    return filter
  }
}

export { MultiDeleteFilterUseCase }
