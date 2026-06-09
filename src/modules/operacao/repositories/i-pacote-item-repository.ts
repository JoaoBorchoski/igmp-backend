import { IPacoteItemDTO } from '@modules/operacao/dtos/i-pacote-item-dto'
import { HttpResponse } from '@shared/helpers'
import { EntityManager } from 'typeorm'

interface IPacoteItemRepository {
	// create
	create(data: IPacoteItemDTO): Promise<HttpResponse>

	createWithQueryRunner({ pacoteId, produto, quantidade }: IPacoteItemDTO, transactionManager: EntityManager): Promise<HttpResponse>

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

	getQuantidadeByPedidoIdAndProdutoId(pedidoId: string, produtoId: string): Promise<HttpResponse>

	getQuantidadeByPedidoIdAndProdutoIdWithQueryRunner(pedidoId: string, produtoId: string, transactionManager: EntityManager): Promise<HttpResponse>

	getByPacoteId(pacoteId: string): Promise<HttpResponse>

	// update
	update(data: IPacoteItemDTO): Promise<HttpResponse>

	updateWithQueryRunner(data: IPacoteItemDTO, transactionManager: EntityManager): Promise<HttpResponse>

	// delete
	delete(id: string): Promise<HttpResponse>

	deleteWithQueryRunner(id: string, transactionManager: EntityManager): Promise<HttpResponse>

	// multi delete
	multiDelete(ids: string[]): Promise<HttpResponse>
}

export { IPacoteItemRepository }
