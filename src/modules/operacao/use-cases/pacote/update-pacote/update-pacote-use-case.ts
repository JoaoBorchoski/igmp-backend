import { inject, injectable } from 'tsyringe'
import { IPacoteRepository } from '@modules/operacao/repositories/i-pacote-repository'
import { conflictError, HttpResponse, ok, serverError } from '@shared/helpers'
import { getConnection } from 'typeorm'
import { IPacoteItemRepository } from '@modules/operacao/repositories/i-pacote-item-repository'
import { IProdutoRepository } from '@modules/configuracao/repositories/i-produto-repository'
import { IPedidoRepository } from '@modules/operacao/repositories/i-pedido-repository'
import puppeteer from 'puppeteer'
import QRCode from 'qrcode'
import { EntityManager } from 'typeorm'
import { IEspelhoCargaItemsRepository } from '@modules/operacao/repositories/i-espelho-carga-items-repository'

interface IPacoteItemRequest {
	id?: string
	produtoId: string
	quantidade?: number
	quantidadeLateral?: number
	quantidadeCabeceira?: number
	quantidadeLateralCabeceira?: number
	tipoItem?: number
	descricao?: string
}

interface IRequest {
	id: string
	pedidoId: string
	descricao: string
	pacoteItems?: IPacoteItemRequest[]
	cor: string
}

interface IItemCriado {
	produto: string
	quantidade: number
	tipo?: string
	descricao?: string
}

@injectable()
class UpdatePacoteUseCase {
	constructor(
		@inject('PacoteRepository')
		private pacoteRepository: IPacoteRepository,
		@inject('PacoteItemRepository')
		private pacoteItemRepository: IPacoteItemRepository,
		@inject('ProdutoRepository')
		private produtoRepository: IProdutoRepository,
		@inject('PedidoRepository')
		private pedidoRepository: IPedidoRepository,
		@inject('EspelhoCargaItemsRepository')
		private espelhoCargaItemsRepository: IEspelhoCargaItemsRepository
	) {}

	async execute({ id, pedidoId, descricao, pacoteItems = [], cor }: IRequest): Promise<HttpResponse> {
		const queryRunner = getConnection().createQueryRunner()
		await queryRunner.startTransaction()

		try {
			const pedido = await this.pedidoRepository.get(pedidoId)
			const numPacotes = await this.pacoteRepository.getNumeroPacotesByPedidoId(pedidoId)

			const alreadyHasEspelhoCarga = await this.espelhoCargaItemsRepository.getByPacoteItemId(id)

			if (alreadyHasEspelhoCarga.statusCode === 200) {
				return conflictError('Pacote já tem espelho de carga')
			}

			const result = await this.pacoteRepository.updateWithQueryRunner(
				{
					id,
					pedidoId,
					descricao,
					cor,
				},
				queryRunner.manager
			)

			const itemsCriados = await this.processarPacoteItems(result.data.id, pacoteItems, !!pedidoId, queryRunner.manager)

			const pdfBuffer = await this.gerarPdf(result.data.id, pedido, result.data.descricao, itemsCriados, cor, numPacotes.data.count)

			await queryRunner.commitTransaction()

			return ok(pdfBuffer)
		} catch (error) {
			console.log('Erro ao atualizar pacote:', error)
			await queryRunner.rollbackTransaction()
			return serverError(error.message || 'Erro ao atualizar pacote')
		} finally {
			await queryRunner.release()
		}
	}

	private async processarPacoteItems(pacoteId: string, pacoteItems: IPacoteItemRequest[], temPedido: boolean, manager: EntityManager): Promise<IItemCriado[]> {
		const pacoteItemsOld = await this.pacoteItemRepository.getByPacoteId(pacoteId)
		const itemsOldIds = pacoteItemsOld.data.map((item) => item.id)

		// Identificar items para deletar, atualizar e criar
		const itemsApagados = pacoteItemsOld.data.filter((item) => !pacoteItems.some((itemPacote) => itemPacote.id === item.id))
		const itemsAtualizados = pacoteItems.filter((item) => item.id && itemsOldIds.includes(item.id))
		const newPacoteItems = pacoteItems.filter((item) => !item.id || !itemsOldIds.includes(item.id))

		// Deletar items removidos
		if (itemsApagados.length > 0) {
			await this.pacoteItemRepository.deleteWithQueryRunner(
				itemsApagados.map((item) => item.id),
				manager
			)
		}

		const itemsCriados: IItemCriado[] = []

		// Atualizar items existentes
		for (const item of itemsAtualizados) {
			const itemCriado = await this.atualizarPacoteItem(item, pacoteId, temPedido, manager)
			itemsCriados.push(...itemCriado)
		}

		// Criar novos items
		for (const item of newPacoteItems) {
			const itemCriado = await this.criarPacoteItem(item, pacoteId, temPedido, manager)
			itemsCriados.push(...itemCriado)
		}

		return itemsCriados
	}

	private async atualizarPacoteItem(item: IPacoteItemRequest, pacoteId: string, temPedido: boolean, manager: EntityManager): Promise<IItemCriado[]> {
		if (temPedido) {
			const pacoteItem = await this.pacoteItemRepository.updateWithQueryRunner(
				{
					id: item.id,
					pacoteId,
					produto: item.produtoId,
					quantidade: item.quantidade,
					quantidadeLateral: item.quantidadeLateral,
					quantidadeCabeceira: item.quantidadeCabeceira,
					quantidadeLateralCabeceira: item.quantidadeLateralCabeceira,
					tipoItem: item.tipoItem,
					descricao: item.descricao,
				},
				manager
			)

			const produto = await this.produtoRepository.get(item.produtoId)
			return this.processarQuantidadesEspecificas(pacoteItem.data, produto.data.nomeCompleto)
		} else {
			const produto = await this.produtoRepository.get(item.produtoId)
			const pacoteItem = await this.pacoteItemRepository.updateWithQueryRunner(
				{
					id: item.id,
					pacoteId,
					produto: item.produtoId,
					quantidade: item.quantidade,
				},
				manager
			)

			return [
				{
					produto: produto.data.nomeCompleto,
					quantidade: pacoteItem.data.quantidade,
				},
			]
		}
	}

	private async criarPacoteItem(item: IPacoteItemRequest, pacoteId: string, temPedido: boolean, manager: EntityManager): Promise<IItemCriado[]> {
		if (temPedido) {
			const pacoteItem = await this.pacoteItemRepository.createWithQueryRunner(
				{
					pacoteId,
					produto: item.produtoId,
					quantidade: item.quantidade,
					quantidadeLateral: item.quantidadeLateral,
					quantidadeCabeceira: item.quantidadeCabeceira,
					quantidadeLateralCabeceira: item.quantidadeLateralCabeceira,
					tipoItem: item.tipoItem,
					descricao: item.descricao,
				},
				manager
			)

			const produto = await this.produtoRepository.get(item.produtoId)
			return this.processarQuantidadesEspecificas(pacoteItem.data, produto.data.nomeCompleto)
		} else {
			const produto = await this.produtoRepository.get(item.produtoId)
			const pacoteItem = await this.pacoteItemRepository.createWithQueryRunner(
				{
					pacoteId,
					produto: item.produtoId,
					quantidade: item.quantidade,
				},
				manager
			)

			return [
				{
					produto: produto.data.nomeCompleto,
					quantidade: pacoteItem.data.quantidade,
				},
			]
		}
	}

	private processarQuantidadesEspecificas(
		pacoteItem: {
			quantidade?: number
			quantidadeLateral?: number
			quantidadeCabeceira?: number
			quantidadeLateralCabeceira?: number
		},
		nomeProduto: string
	): IItemCriado[] {
		const temQuantidadesEspecificas =
			(pacoteItem.quantidadeLateral && pacoteItem.quantidadeLateral > 0) ||
			(pacoteItem.quantidadeCabeceira && pacoteItem.quantidadeCabeceira > 0) ||
			(pacoteItem.quantidadeLateralCabeceira && pacoteItem.quantidadeLateralCabeceira > 0)

		if (!temQuantidadesEspecificas) {
			return [
				{
					produto: nomeProduto,
					quantidade: pacoteItem.quantidade || 0,
				},
			]
		}

		// Mesma lógica do create-pacote: um item por produto com descricao agregada
		const descricoes: string[] = []
		if (pacoteItem.quantidadeLateral && pacoteItem.quantidadeLateral > 0) {
			descricoes.push(`Lateral: ${pacoteItem.quantidadeLateral} PÇS`)
		}
		if (pacoteItem.quantidadeCabeceira && pacoteItem.quantidadeCabeceira > 0) {
			descricoes.push(`Cabeceira: ${pacoteItem.quantidadeCabeceira} PÇS`)
		}
		if (pacoteItem.quantidadeLateralCabeceira && pacoteItem.quantidadeLateralCabeceira > 0) {
			descricoes.push(`Lateral da Cabeceira: ${pacoteItem.quantidadeLateralCabeceira} PÇS`)
		}

		return [
			{
				produto: nomeProduto,
				quantidade: 0,
				tipo: 'Conjunto',
				descricao: descricoes.join(' - '),
			},
		]
	}

	private async gerarPdf(pacoteId: string, pedido: HttpResponse, descricao: string, itemsCriados: IItemCriado[], cor: string, numPacotes: number): Promise<Buffer> {
		const qrCodeDados = {
			pacoteId,
			pedidoId: pedido?.data?.id ?? null,
			descricao,
		}

		const qrCodeDadosStringify = JSON.stringify(qrCodeDados)
		const qrcode = await QRCode.toDataURL(qrCodeDadosStringify, {
			color: {
				dark: '#000000',
				light: '#00000000',
			},
		})

		const htmlContent = this.gerarHtmlContent(itemsCriados, cor, qrcode, pedido, numPacotes, descricao)

		const browser = await puppeteer.launch({
			headless: true,
			executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || undefined,
			args: ['--no-sandbox', '--disable-setuid-sandbox'],
		})

		try {
			const page = await browser.newPage()
			await page.setContent(htmlContent)

			const pdfBuffer = await page.pdf({
				format: 'A4',
				printBackground: true,
			})

			return pdfBuffer as Buffer
		} finally {
			await browser.close()
		}
	}

	private gerarHtmlContent(itemsCriados: IItemCriado[], qrCodeColor: string, qrcode: string, pedido: HttpResponse, numPacotes: number, descricao: string): string {
		const itemsHtml = itemsCriados
			.map((item) => {
				if (item.tipo === 'Conjunto' && item.descricao) {
					return `<li>${item.produto} - ${item.descricao}</li>`
				}
				if (item.tipo) {
					return `<li>${item.produto} - ${item.tipo} = ${item.quantidade} PÇS</li>`
				}
				return `<li>${item.produto} = ${item.quantidade} PÇS${item.descricao ? ` - ${item.descricao}` : ''}</li>`
			})
			.join('')

		const loteHtml = pedido && pedido?.data?.clienteNome ? `<h1>LOTE ${pedido.data.clienteNome}</h1>` : 'Movimentação Interna'

		const dataFormatada = this.formatarData(pedido, numPacotes, descricao)

		const dataEmissaoHtml = pedido.data
			? new Date().toLocaleDateString('pt-BR', {
					year: 'numeric',
					month: '2-digit',
					day: '2-digit',
			  })
			: ''

		const descricaoHtml = this.gerarDescricao(descricao, pedido, qrCodeColor, qrcode, loteHtml, dataFormatada, dataEmissaoHtml)

		return `
            <html>
                <head>
                    <title>IGMP - PACOTE</title>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            padding: 20px;
                            text-align: center;
                        }
                        .nome {
                            color: #6495ED;
                        }
                        ul {
                            padding-left: 0;
                            list-style: none;
                        }
                        li {
                            margin-bottom: 8px;
                            font-size: 16px;
                        }
                    </style>
                </head>
                <body>
                    <div>
                        <h3 class="nome">IGMP PORTAS E ESQUADRIAS LTDA/CNPJ: 47.673.906/0001-30</h3>
                        <ul>
                            ${itemsHtml}
                        </ul>
                        ${descricaoHtml}
                    </div>
                </body>
            </html>
        `
	}

	private gerarDescricao(descricao: string, pedido: HttpResponse, qrCodeColor: string, qrcode: string, loteHtml: string, dataFormatada: string, dataEmissaoHtml: string): string {
		if (pedido.data) {
			return `
					<div style="display: flex; justify-content: center; align-items: center; width: 100%; height: 300px;">
						<div style="width: 50%; display: flex; justify-content: center; align-items: center;">
								<div style="width: 250px; height: 250px; background-color: ${qrCodeColor}; border-radius: 50%; display: flex; justify-content: center; align-items: center;">
										<img src="${qrcode}" alt="QR Code" style="width: 80%; height: auto;" />
								</div>
						</div>
						<div style="width: 50%; text-align: center;">
								<div>
										${loteHtml}
										<h1>${dataFormatada}</h1>
										<p>${dataEmissaoHtml}</p>
								</div>
						</div>
					</div>
			`
		} else {
			return `
				<div style="display: flex; justify-content: center; align-items: center; width: 100%; height: 300px;">
						<div style="width: 50%; display: flex; justify-content: center; align-items: center;">
								<div style="width: 250px; height: 250px; background-color: ${qrCodeColor}; border-radius: 50%; display: flex; justify-content: center; align-items: center;">
										<img src="${qrcode}" alt="QR Code" style="width: 80%; height: auto;" />
								</div>
						</div>

						<div style="width: 50%; text-align: center;">
								<div>
										${!!pedido.data ? '' : '<p>Movimentação Interna</p>'}
										${pedido?.data?.clienteNome ? `<h1>LOTE ${pedido?.data?.clienteNome}</h1>` : ''}
										${!!pedido.data ? '' : descricao ? `<h3>${descricao}</h3>` : '<p>Sem descrição</p>'}
										<h1>${(() => {
											const desc = pedido?.data?.descricao?.split(':')[1]?.split(' - ')?.reverse()?.join(' - ')

											if (desc) {
												return desc
											}

											if (!pedido.data) {
												return new Date().toLocaleDateString('pt-BR', {
													year: 'numeric',
													month: '2-digit',
													day: '2-digit',
												})
											}

											const [day, month, year] = pedido.data.dataEmissao.split('/')
											const formattedDateString = `${day.padStart(2, '0')}${month.padStart(2, '0')}${year.slice(-2)}`
											return formattedDateString
										})()}</h1>
										<p>
												${
													pedido.data
														? new Date().toLocaleDateString('pt-BR', {
																year: 'numeric',
																month: '2-digit',
																day: '2-digit',
														  })
														: ''
												}
										</p>
								</div>
						</div>
				</div>
			`
		}
	}

	private formatarData(pedido: HttpResponse, numPacotes: number, descricao: string): string {
		if (!pedido.data) {
			return new Date().toLocaleDateString('pt-BR', {
				year: 'numeric',
				month: '2-digit',
				day: '2-digit',
			})
		}

		const desc = pedido?.data?.descricao?.split(':')[1]?.split(' - ')?.reverse()?.join(' - ')
		const [day, month, year] = pedido.data.dataEmissao.split('/')
		const formattedDateString = `${day.padStart(2, '0')}${month.padStart(2, '0')}${year.slice(-2)}`
		// const formattedDescricao = descricao ? descricao.split('.')[1] : ''
		// const sequencial = pedido?.data?.sequencial ? `/${pedido.data.sequencial}.${numPacotes}` : ''

		const sequencial = descricao
			? descricao.toLowerCase().includes('pacote')
				? `/${pedido?.data?.sequencial}.${descricao.split('Unidade ')[1]}`
				: `/${descricao.split('/')[1]}`
			: ''

		return `${desc || formattedDateString}${sequencial}`
	}
}

export { UpdatePacoteUseCase }
