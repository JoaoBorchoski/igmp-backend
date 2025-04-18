import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { GetTipoPortaUseCase } from './get-tipo-porta-use-case'

class GetTipoPortaController {
  async handle(request: Request, response: Response): Promise<Response> {
    const id = request.params.id
    const getTipoPortaUseCase = container.resolve(GetTipoPortaUseCase)
    const tipoPorta = await getTipoPortaUseCase.execute(id)

    return response.status(tipoPorta.statusCode).json(tipoPorta.data)
  }
}

export { GetTipoPortaController }
