import { Request, Response } from "express"
import { container } from "tsyringe"
import { ImportProdutoUseCase } from "./importo-produto-use-case"

class ImportProdutoController {
	async handle(request: Request, response: Response): Promise<Response> {
		if (!request.file) {
			return response.status(400).json({ error: "Nenhum arquivo foi enviado." })
		}
		const importProdutoUseCase = container.resolve(ImportProdutoUseCase)

		const result = await importProdutoUseCase.execute({
			file: request.file,
		})

		return response.status(result.statusCode).send(result.data)
	}
}

export { ImportProdutoController }
