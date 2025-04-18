import { inject, injectable } from 'tsyringe'
import { Filter } from '@modules/security/infra/typeorm/entities/filter'
import { IFilterRepository } from '@modules/security/repositories/i-filter-repository'
import { HttpResponse } from '@shared/helpers'

@injectable()
class GetFilterUseCase {
  constructor(@inject('FilterRepository')
    private filterRepository: IFilterRepository
  ) {}

  async execute(id: string): Promise<HttpResponse> {
    const filter = await this.filterRepository.get(id)

    const newFilter = {
      statusCode: filter.statusCode,
      data: {
        id: filter.data.id,
        code: filter.data.code,
        description: filter.data.description,
        instructionsToSolve: filter.data.instructionsToSolve,
        isSolvedByPasswordReset: filter.data.isSolvedByPasswordReset,
        disabled: filter.data.disabled,
      }
    }

    return newFilter
  }
}

export { GetFilterUseCase }
