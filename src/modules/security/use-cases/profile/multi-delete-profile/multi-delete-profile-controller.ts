import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { MultiDeleteProfileUseCase } from './multi-delete-profile-use-case'
import { ListProfileUseCase } from '../list-profile/list-profile-use-case'

class MultiDeleteProfileController {
  async handle(request: Request, response: Response): Promise<Response> {
    // delete multi record

    const ids = request.body
    const multiDeleteProfileUseCase = container.resolve(MultiDeleteProfileUseCase)
    await multiDeleteProfileUseCase.execute(ids)


    // restore list with updated records

    const listProfileUseCase = container.resolve(ListProfileUseCase)
    const profiles = await listProfileUseCase.execute({
      search: '',
      page: 0,
      rowsPerPage: 100,
      order: ''
    })

    return response.json(profiles)
  }
}

export { MultiDeleteProfileController }
