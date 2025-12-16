import { IEspelhoCargaDTO } from "@modules/operacao/dtos/i-espelho-carga-dto"
import { HttpResponse } from "@shared/helpers"
import { EntityManager } from "typeorm"

interface IEspelhoCargaRepository {
	// create
	create(data: IEspelhoCargaDTO): Promise<HttpResponse>

	createWithQueryRunner(
		{ pedidoId, placa, motorista, lote, descricao }: IEspelhoCargaDTO,
		transactionManager: EntityManager
	): Promise<HttpResponse>

	// list
	list(search: string, page: number, rowsPerPage: number, order: string, filter: string): Promise<HttpResponse>

	// select
	select(filter: string): Promise<HttpResponse>

	// id select
	idSelect(id: string): Promise<HttpResponse>

	// count
	count(search: string, filter: string): Promise<HttpResponse>

	// get
	get(id: string): Promise<HttpResponse>

	// update
	update(data: IEspelhoCargaDTO): Promise<HttpResponse>

	updateWithQueryRunner(
		{ id, pedidoId, placa, motorista, lote, descricao }: IEspelhoCargaDTO,
		transactionManager: EntityManager
	): Promise<HttpResponse>

	// delete
	delete(id: string): Promise<HttpResponse>

	deleteWithQueryRunner(id: string, transactionManager: EntityManager): Promise<HttpResponse>

	// multi delete
	multiDelete(ids: string[]): Promise<HttpResponse>
}

export { IEspelhoCargaRepository }
