import { inject, injectable } from "tsyringe"
import { IMqProvider } from "@shared/container/providers/mq-provider/i-mq-provider"

@injectable()
class QueueProvider {
	constructor(
		@inject("MqProvider")
		private mqProvider: IMqProvider
	) {}

	async sendJob(queue: string, jobData: any): Promise<void> {
		await this.mqProvider.sendJob(queue, jobData)
	}

	async consumeJobs(queue: string, onMessage: (msg: any) => Promise<void>): Promise<void> {
		await this.mqProvider.consumeJobs(queue, onMessage)
	}
}

export { QueueProvider }
