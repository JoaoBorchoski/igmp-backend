import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UpdateSentidoAberturaUseCase } from './update-sentido-abertura-use-case'

class UpdateSentidoAberturaController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      nome,
      descricao
    } = request.body

    const { id } = request.params

    const updateSentidoAberturaUseCase = container.resolve(UpdateSentidoAberturaUseCase)

    const result = await updateSentidoAberturaUseCase.execute({
        id,
        nome,
        descricao
      })
      .then(sentidoAberturaResult => {
        return sentidoAberturaResult
      })
      .catch(error => {
        return error
      })

    return response.status(result.statusCode).json(result)
  }
}

export { UpdateSentidoAberturaController }
