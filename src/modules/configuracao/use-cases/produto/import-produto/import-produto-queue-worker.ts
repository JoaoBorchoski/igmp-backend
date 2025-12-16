import { container } from "tsyringe"
import { ImportProdutoUseCase } from "./importo-produto-use-case"
import fs from "fs"
import path from "path"
import uploadConfig from "@config/upload"

interface IJobData {
	type: "process_row" | "cleanup_file"
	row?: any
	rowIndex?: number
	totalRows?: number
	fileName: string
	originalName: string
}

class ImportProdutoQueueWorker {
	async processJob(jobData: IJobData): Promise<void> {
		try {
			if (jobData.type === "cleanup_file") {
				// Job de limpeza: remove o arquivo
				const fullPath = path.join(uploadConfig.tmpFolder, jobData.fileName)
				if (fs.existsSync(fullPath)) {
					fs.unlinkSync(fullPath)
					console.log(`[ImportProdutoWorker] File deleted: ${jobData.fileName}`)
				}
				return
			}

			// Job de processamento de linha
			if (jobData.type !== "process_row" || !jobData.row) {
				throw new Error("Invalid job data: missing row data")
			}

			// console.log(
			// 	`[ImportProdutoWorker] Processing row ${jobData.rowIndex}/${jobData.totalRows} from file: ${jobData.fileName}`
			// )

			// Resolve o use case do container
			const importProdutoUseCase = container.resolve(ImportProdutoUseCase)

			// Processa a linha individual
			const result = await importProdutoUseCase.processSingleRow(jobData.row)

			if (result.statusCode === 200) {
				// console.log(`[ImportProdutoWorker] Successfully processed row ${jobData.rowIndex}/${jobData.totalRows}`)
			} else {
				// console.error(
				// 	`[ImportProdutoWorker] Error processing row ${jobData.rowIndex}/${jobData.totalRows}:`,
				// 	result.data
				// )
				// Não lança erro para não reenviar o job, apenas loga
			}
		} catch (error) {
			console.error(`[ImportProdutoWorker] Error processing job:`, error)
			throw error
		}
	}
}

export { ImportProdutoQueueWorker }
