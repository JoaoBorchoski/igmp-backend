import { Request, Response } from "express"
import { container } from "tsyringe"
import { DeleteEspelhoCargaUseCase } from "./delete-espelho-carga-use-case"
import { ListEspelhoCargaUseCase } from "../list-espelho-carga/list-espelho-carga-use-case"

class DeleteEspelhoCargaController {
	async handle(request: Request, response: Response): Promise<Response> {
		const { id } = request.params

		const deleteEspelhoCargaUseCase = container.resolve(DeleteEspelhoCargaUseCase)
		const result = await deleteEspelhoCargaUseCase.execute(id)

		const listEspelhoCargaUseCase = container.resolve(ListEspelhoCargaUseCase)
		const espelhosCarga = await listEspelhoCargaUseCase.execute({
			search: "",
			page: 0,
			rowsPerPage: 100,
			order: "",
		})

		return response.json(espelhosCarga)
	}
}

export { DeleteEspelhoCargaController }
