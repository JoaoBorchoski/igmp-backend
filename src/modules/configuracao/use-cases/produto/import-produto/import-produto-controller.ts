import { Request, Response } from "express"
import { container } from "tsyringe"
import { QueueProvider } from "@shared/infra/mq/queue-provider"
import xlsx from "xlsx"
import fs from "fs"

class ImportProdutoController {
	private parseExcelFile = async (file: Express.Multer.File): Promise<any[]> => {
		return new Promise((resolve) => {
			const fileContent = fs.readFileSync(file.path)
			const workbook = xlsx.read(fileContent, { type: "buffer" })
			const sheetNames = workbook.SheetNames
			const excelData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetNames[0]])

			resolve(excelData)
		})
	}

	private sendJobsToQueue = async (rows: any[], fileName: string, originalName: string): Promise<void> => {
		try {
			const queueProvider = container.resolve(QueueProvider)
			const queueName = process.env.IMPORT_PRODUTO_QUEUE || "import_produto"
			const totalRows = rows.length

			console.log(`[ImportProdutoController] Sending ${totalRows} rows to queue`)

			// Envia cada linha como um job separado para a fila
			const sendPromises = rows.map((row, i) =>
				queueProvider.sendJob(queueName, {
					type: "process_row",
					row: row,
					rowIndex: i + 1,
					totalRows: totalRows,
					fileName: fileName,
					originalName: originalName,
				})
			)

			// Aguarda todos os jobs serem enviados
			await Promise.all(sendPromises)

			// Envia um job final para limpar o arquivo
			await queueProvider.sendJob(queueName, {
				type: "cleanup_file",
				fileName: fileName,
				originalName: originalName,
			})

			console.log(`[ImportProdutoController] All ${totalRows} jobs sent to queue`)
		} catch (error) {
			console.error("[ImportProdutoController] Error sending jobs to queue:", error)
		}
	}

	handle = async (request: Request, response: Response): Promise<Response> => {
		if (!request.file) {
			return response.status(400).json({ error: "Nenhum arquivo foi enviado." })
		}

		try {
			// Lê o arquivo Excel
			const rows = await this.parseExcelFile(request.file)
			const totalRows = rows.length

			// Retorna a resposta imediatamente (não espera o envio dos jobs)
			response.status(202).json({
				message: "Importação iniciada. O arquivo será processado em background.",
				fileName: request.file.originalname,
				totalRows: totalRows,
			})

			// Processa o envio dos jobs em background (não bloqueia a resposta)
			this.sendJobsToQueue(rows, request.file.filename, request.file.originalname).catch((error) => {
				console.error("[ImportProdutoController] Background job sending failed:", error)
			})
		} catch (error) {
			console.error("Error processing file:", error)
			return response.status(500).json({
				error: "Erro ao processar arquivo.",
				message: error.message,
			})
		}
	}
}

export { ImportProdutoController }
