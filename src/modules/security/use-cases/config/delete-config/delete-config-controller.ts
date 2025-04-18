import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { DeleteConfigUseCase } from './delete-config-use-case'

class DeleteConfigController {
  async handle(request: Request, response: Response): Promise<Response> {
    // delete record
    
    const id = request.params.id
    const deleteConfigUseCase = container.resolve(DeleteConfigUseCase)
    const result = await deleteConfigUseCase.execute(id)

    return response.status(result.statusCode).send()
  }
}

export { DeleteConfigController }
