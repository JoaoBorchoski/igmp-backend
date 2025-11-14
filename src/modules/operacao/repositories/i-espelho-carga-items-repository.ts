import { IEspelhoCargaItemsDTO } from "@modules/operacao/dtos/i-espelho-carga-items-dto"
import { HttpResponse } from "@shared/helpers"
import { EntityManager } from "typeorm"

interface IEspelhoCargaItemsRepository {
	// create
	create(data: IEspelhoCargaItemsDTO): Promise<HttpResponse>

	createWithQueryRunner(
		{ espelhoCargaId, pacoteItemId, quantidade }: IEspelhoCargaItemsDTO,
		transactionManager: EntityManager
	): Promise<HttpResponse>

	// list
	list(search: string, page: number, rowsPerPage: number, order: string, filter: string): Promise<HttpResponse>

	// select
	select(filter: string): Promise<HttpResponse>

	selectByEspelhoCargaId(filter: string, espelhoCargaId: string): Promise<HttpResponse>

	// id select
	idSelect(id: string): Promise<HttpResponse>

	// count
	count(search: string, filter: string): Promise<HttpResponse>

	// get
	get(id: string): Promise<HttpResponse>

	getByEspelhoCargaId(espelhoCargaId: string): Promise<HttpResponse>

	// update
	update(data: IEspelhoCargaItemsDTO): Promise<HttpResponse>

	updateWithQueryRunner(
		{ id, espelhoCargaId, pacoteItemId, quantidade }: IEspelhoCargaItemsDTO,
		transactionManager: EntityManager
	): Promise<HttpResponse>

	// delete
	delete(id: string): Promise<HttpResponse>

	// multi delete
	multiDelete(ids: string[]): Promise<HttpResponse>

	deleteWithQueryRunner(ids: string[], transactionManager: EntityManager): Promise<HttpResponse>

	deleteByEspelhoCargaIdWithQueryRunner(
		espelhoCargaId: string,
		transactionManager: EntityManager
	): Promise<HttpResponse>
}

export { IEspelhoCargaItemsRepository }
