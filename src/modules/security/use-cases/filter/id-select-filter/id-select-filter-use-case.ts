import { inject, injectable } from "tsyringe"
import { IFilterRepository } from '@modules/security/repositories/i-filter-repository'
import { HttpResponse } from '@shared/helpers/http'

@injectable()
class IdSelectFilterUseCase {
  constructor(@inject('FilterRepository')
    private filterRepository: IFilterRepository
  ) {}

  async execute({ id }): Promise<HttpResponse> {
    const filter = await this.filterRepository.idSelect(id)

    return filter
  }
}

export { IdSelectFilterUseCase }
