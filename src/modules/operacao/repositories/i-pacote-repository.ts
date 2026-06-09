import { IPacoteDTO } from '@modules/operacao/dtos/i-pacote-dto'
import { HttpResponse } from '@shared/helpers'
import { EntityManager } from 'typeorm'

interface IPacoteRepository {
	// create
	create(data: IPacoteDTO): Promise<HttpResponse>

	createWithQueryRunner({ pedidoId, descricao, cor }: IPacoteDTO, transactionManager: EntityManager, seq?: number): Promise<HttpResponse>

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

	getProdutoInfo(produtoId: string, pedidoId: string): Promise<HttpResponse>

	getByPedidoId(pedidoId: string): Promise<HttpResponse>

	// update
	update(data: IPacoteDTO): Promise<HttpResponse>

	updateWithQueryRunner({ id, pedidoId, descricao, cor }: IPacoteDTO, transactionManager: EntityManager): Promise<HttpResponse>

	// delete
	delete(id: string): Promise<HttpResponse>

	// multi delete
	multiDelete(ids: string[]): Promise<HttpResponse>

	deleteWithQueryRunner(id: string, transactionManager: EntityManager): Promise<HttpResponse>

	getNumeroPacotesByPedidoId(pedidoId: string): Promise<HttpResponse>

	updatePacoteItemStatus(id: string, espelhoCargaId: string): Promise<HttpResponse>

	updatePacoteItemDescarregadoStatus(id: string, espelhoCargaId: string): Promise<HttpResponse>

	getPacoteColor(): Promise<HttpResponse>

	selectPacotesByPedidoId(filter: string, pedidoId: string): Promise<HttpResponse>

	idSelectPacotesByPedidoId(id: string): Promise<HttpResponse>

	selectInterno(filter: string): Promise<HttpResponse>
}

export { IPacoteRepository }
