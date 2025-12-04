import { Request, Response } from "express"
import { container } from "tsyringe"
import { QueueProvider } from "@shared/infra/mq/queue-provider"

class ImportProdutoController {
	async handle(request: Request, response: Response): Promise<Response> {
		if (!request.file) {
			return response.status(400).json({ error: "Nenhum arquivo foi enviado." })
		}

		try {
			const queueProvider = container.resolve(QueueProvider)
			const queueName = process.env.IMPORT_PRODUTO_QUEUE || "import_produto"

			// Envia o job para a fila
			await queueProvider.sendJob(queueName, {
				filePath: request.file.path,
				fileName: request.file.filename,
				originalName: request.file.originalname,
			})

			return response.status(202).json({
				message: "Importação iniciada. O arquivo será processado em background.",
				fileName: request.file.originalname,
			})
		} catch (error) {
			console.error("Error sending job to queue:", error)
			return response.status(500).json({
				error: "Erro ao enviar importação para processamento.",
				message: error.message,
			})
		}
	}
}

export { ImportProdutoController }
