import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { DeleteProfileUseCase } from './delete-profile-use-case'
import { ListProfileUseCase } from '../list-profile/list-profile-use-case'

class DeleteProfileController {
  async handle(request: Request, response: Response): Promise<Response> {
    // delete record
    
    const id = request.params.id
    const deleteProfileUseCase = container.resolve(DeleteProfileUseCase)
    await deleteProfileUseCase.execute(id)


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

export { DeleteProfileController }
