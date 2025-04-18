import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { IdSelectTipoPortaUseCase } from './id-select-tipo-porta-use-case'

class IdSelectTipoPortaController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const idSelectTipoPortaUseCase = container.resolve(IdSelectTipoPortaUseCase)

    const tipoPorta = await idSelectTipoPortaUseCase.execute({
      id: id as string
    })

    return response.json(tipoPorta.data)
  }
}

export { IdSelectTipoPortaController }
