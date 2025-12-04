import { container } from "tsyringe"
import { ImportProdutoUseCase } from "./importo-produto-use-case"
import fs from "fs"
import path from "path"
import uploadConfig from "@config/upload"

interface IJobData {
	filePath: string
	fileName: string
	originalName: string
}

class ImportProdutoQueueWorker {
	async processJob(jobData: IJobData): Promise<void> {
		try {
			console.log(`[ImportProdutoWorker] Processing file: ${jobData.fileName}`)

			// Verifica se o arquivo existe
			const fullPath = path.join(uploadConfig.tmpFolder, jobData.fileName)
			if (!fs.existsSync(fullPath)) {
				throw new Error(`File not found: ${fullPath}`)
			}

			// Cria um objeto file compatível com Express.Multer.File
			const file: Express.Multer.File = {
				fieldname: "arquivos",
				originalname: jobData.originalName,
				encoding: "7bit",
				mimetype: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
				destination: uploadConfig.tmpFolder,
				filename: jobData.fileName,
				path: fullPath,
				size: fs.statSync(fullPath).size,
			} as Express.Multer.File

			// Resolve o use case do container
			const importProdutoUseCase = container.resolve(ImportProdutoUseCase)

			// Processa a importação
			const result = await importProdutoUseCase.execute({ file })

			if (result.statusCode !== 200) {
				throw new Error(`Import failed: ${JSON.stringify(result.data)}`)
			}

			// Remove o arquivo após processamento
			if (fs.existsSync(fullPath)) {
				fs.unlinkSync(fullPath)
				console.log(`[ImportProdutoWorker] File deleted: ${jobData.fileName}`)
			}

			console.log(`[ImportProdutoWorker] Successfully processed: ${jobData.fileName}`)
		} catch (error) {
			console.error(`[ImportProdutoWorker] Error processing job:`, error)
			throw error
		}
	}
}

export { ImportProdutoQueueWorker }
