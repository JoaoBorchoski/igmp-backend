import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { MultiDeleteProfileOptionUseCase } from './multi-delete-profile-option-use-case'
import { ListProfileOptionUseCase } from '../list-profile-option/list-profile-option-use-case'

class MultiDeleteProfileOptionController {
  async handle(request: Request, response: Response): Promise<Response> {
    // delete multi record

    const ids = request.body
    const multiDeleteProfileOptionUseCase = container.resolve(MultiDeleteProfileOptionUseCase)
    await multiDeleteProfileOptionUseCase.execute(ids)


    // restore list with updated records

    const listProfileOptionUseCase = container.resolve(ListProfileOptionUseCase)
    const profileOptions = await listProfileOptionUseCase.execute({
      search: '',
      page: 0,
      rowsPerPage: 100,
      order: ''
    })

    return response.json(profileOptions)
  }
}

export { MultiDeleteProfileOptionController }
