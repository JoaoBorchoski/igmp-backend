import { inject, injectable } from "tsyringe"
import { IEspelhoCargaRepository } from "@modules/operacao/repositories/i-espelho-carga-repository"
import { IPedidoRepository } from "@modules/operacao/repositories/i-pedido-repository"
import { HttpResponse, ok, serverError } from "@shared/helpers"
import { AppError } from "@shared/errors/app-error"
import puppeteer from "puppeteer"
import { IPacoteItemRepository } from "@modules/operacao/repositories/i-pacote-item-repository"
import { IPacoteRepository } from "@modules/operacao/repositories/i-pacote-repository"
import { IProdutoRepository } from "@modules/configuracao/repositories/i-produto-repository"

@injectable()
class ExportEspelhoCargaUseCase {
	constructor(
		@inject("EspelhoCargaRepository")
		private espelhoCargaRepository: IEspelhoCargaRepository,
		@inject("PedidoRepository")
		private pedidoRepository: IPedidoRepository,
		@inject("PacoteRepository")
		private pacoteRepository: IPacoteRepository,
		@inject("PacoteItemRepository")
		private pacoteItemRepository: IPacoteItemRepository,
		@inject("ProdutoRepository")
		private produtoRepository: IProdutoRepository
	) {}

	async execute(id: string): Promise<HttpResponse> {
		let browser
		try {
			const espelhoCarga = await this.espelhoCargaRepository.get(id)
			const pedidosData = {}
			let nomeCliente = ""

			for await (const pacote of espelhoCarga.data.espelhoCargaItems) {
				const pacoteData = await this.pacoteRepository.get(pacote.id)
				const pedidoData = await this.pedidoRepository.get(pacoteData?.data?.pedidoId)

				if (nomeCliente === "") nomeCliente = pedidoData.data.clienteNome

				if (!pedidosData[pedidoData.data.id]) {
					pedidosData[pedidoData.data.id] = pedidoData.data
					pedidosData[pedidoData.data.id].pacotes = []
				}

				pedidosData[pedidoData.data.id].pacotes.push({
					id: pacoteData.data.id,
					descricao: pacoteData.data.descricao,
					items: pacoteData.data.items,
				})
			}

			try {
				browser = await puppeteer.launch({
					headless: true,
					executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || undefined,
					args: ["--no-sandbox", "--disable-setuid-sandbox"],
				})
			} catch (browserError) {
				console.error("Erro ao iniciar o browser:", browserError)
				throw new AppError("Erro ao gerar PDF: Browser não pôde ser iniciado")
			}

			let htmlContent = `
			<html>
				<head>
					<title>IGMP - REGISTRO DE EMBARQUE</title>
					<style>
						body {
							font-family: Arial, sans-serif;
							font-size: 12px;
							margin: 0;
							padding: 20px;
						}
						* {
							font-size: inherit;
						}
						.header {
							text-align: center;
							margin-bottom: 20px;
						}
						.company-name {
							font-size: 18px;
							font-weight: bold;
							margin-bottom: 10px;
						}
						.document-title {
							font-size: 16px;
							font-weight: bold;
							margin-bottom: 20px;
						}
						.info-section {
							margin-bottom: 20px;
						}
						.info-row {
							display: flex;
							justify-content: flex-start;
							align-items: baseline;
							flex-wrap: wrap;
						}
						.info-item {
							flex: 0 0 auto;
							margin-right: 20px;
							font-size: 12px !important;
						}
						.info-item:last-child {
							margin-right: 0;
						}
						.info-label {
							display: inline;
							margin-right: 5px;
							white-space: nowrap;
							font-size: 12px !important;
						}
						.info-value {
							font-weight: bold;
							display: inline;
							white-space: normal;
							word-wrap: break-word;
							font-size: 12px !important;
						}
						table {
							width: 100%;
							border-collapse: collapse;
							margin-top: 20px;
						}
						th {
							background-color: #f0f0f0;
							border: 1px solid #000;
							padding: 8px;
							text-align: left;
							font-weight: bold;
							font-size: 12px;
						}
						td {
							border: 1px solid #000;
							padding: 6px;
							text-align: left;
							font-size: 12px;
						}
						td.center {
							text-align: center;
						}
					</style>
				</head>
				<body>
					<div class="header">
						<div class="company-name">IGMP - REGISTRO DE EMBARQUE</div>
					</div>
					
					<div class="info-section">
						<div class="info-row">
							<div class="info-item">
								<span class="info-label">DATA DO CARREGAMENTO:</span>
								<span class="info-value">${new Date().toLocaleDateString("pt-BR", {
									year: "numeric",
									month: "2-digit",
									day: "2-digit",
								})}</span>
							</div>
							<div class="info-item">
								<span class="info-label">PLACA DO CAMINHÃO:</span>
								<span class="info-value">${espelhoCarga.data.placa || ""}</span>
							</div>
							<div class="info-item">
								<span class="info-label">MOTORISTA:</span>
								<span class="info-value">${espelhoCarga.data.motorista || ""}</span>
							</div>
						</div>
						<div class="info-row">
							<div class="info-item">
								<span class="info-label">CLIENTE:</span>
								<span class="info-value">${nomeCliente}</span>
							</div>
							<div class="info-item">
								<span class="info-label">LOTE DE PRODUÇÃO REF:</span>
								<span class="info-value">${espelhoCarga.data.lote || ""}</span>
							</div>
						</div>
					</div>

					<table>
						<thead>
							<tr>
								<th style="width: 30%;">PEDIDO</th>
								<th style="width: 20%;">Nº ETIQUETA</th>
								<th style="width: 40%;">PRODUTO</th>
								<th style="width: 10%;">QNTD</th>
							</tr>
						</thead>
						<tbody>
							${Object.keys(pedidosData)
								.map((pedidoId) => {
									const pedido = pedidosData[pedidoId]
									let rows = []

									pedido.pacotes.forEach((pacote) => {
										pacote.items.forEach((item) => {
											// QTD. PCT: deixar vazio (pode ser preenchido com quantidade de pacotes se necessário)
											const qtdPct = ""

											// PEDIDO: mostrar descrição do pedido em todas as linhas do mesmo pedido
											const pedidoDesc = pedido.descricao || ""

											// Nº ETIQUETA: placeholder (pode ser preenchido posteriormente)
											const etiqueta = pacote.descricao || ""
											const etiquetaFormated = etiqueta.split("-")[0]?.trim() || null

											const produto = item.produto_nome || ""
											const quantidade =
												item.quantidade ??
												item.quantidade_lateral ??
												item.quantidade_cabeceira ??
												item.quantidade_lateral_cabeceira ??
												0

											rows.push(`
											<tr>
												<td>${pedidoDesc}</td>
												<td>${etiquetaFormated ?? etiqueta}</td>
												<td>${produto}</td>
												<td class="center">${quantidade}</td>
											</tr>
										`)
										})
									})

									return rows.join("")
								})
								.join("")}
						</tbody>
					</table>
				</body>
			</html>
			`

			const page = await browser.newPage()
			await page.setContent(htmlContent, { waitUntil: "networkidle0" })

			const pdfBuffer = await page.pdf({
				format: "A4",
				printBackground: true,
				margin: {
					top: "5mm",
					right: "5mm",
					bottom: "5mm",
					left: "5mm",
				},
			})

			return ok(pdfBuffer)
		} catch (error) {
			console.log("error", error)
			return serverError(error)
		} finally {
			if (browser) {
				try {
					await browser.close()
				} catch (browserCloseError) {
					console.error("Erro ao fechar browser:", browserCloseError)
				}
			}
		}
	}
}

export { ExportEspelhoCargaUseCase }
