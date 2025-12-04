import { container } from "tsyringe"
import { QueueProvider } from "./queue-provider"
import { ImportProdutoQueueWorker } from "@modules/configuracao/use-cases/produto/import-produto/import-produto-queue-worker"

const startImportProdutoWorker = () => {
	const queueName = process.env.IMPORT_PRODUTO_QUEUE || "import_produto"

	if (!process.env.IMPORT_PRODUTO_QUEUE_ENABLED || process.env.IMPORT_PRODUTO_QUEUE_ENABLED === "true") {
		const queueProvider = container.resolve(QueueProvider)
		const importProdutoWorker = new ImportProdutoQueueWorker()

		queueProvider.consumeJobs(queueName, async (jobData) => {
			await importProdutoWorker.processJob(jobData)
		})

		console.log(`[ImportProdutoWorker] Started listening on queue: ${queueName}`)
	} else {
		console.log(`[ImportProdutoWorker] Worker disabled by configuration`)
	}
}

export { startImportProdutoWorker }
