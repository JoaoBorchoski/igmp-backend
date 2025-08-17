import { Request, Response } from "express"
import { container } from "tsyringe"
import { ConfirmaCarregamentoPacoteUseCase } from "./update-pacote-use-case"

class ConfirmaCarregamentoPacoteController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params

        // console.log("ConfirmaCarregamentoPacoteController - ID:", id)

        const confirmaCarregamentoPacoteUseCase = container.resolve(ConfirmaCarregamentoPacoteUseCase)

        const result = await confirmaCarregamentoPacoteUseCase
            .execute({
                id,
            })
            .then((pacoteResult) => {
                return pacoteResult
            })
            .catch((error) => {
                return error
            })

        return response.status(result.statusCode).json(result)
    }
}

export { ConfirmaCarregamentoPacoteController }
