import { container, inject, injectable } from "tsyringe"
import { IMqProvider } from "@shared/container/providers/mq-provider/i-mq-provider"

@injectable()
class WorkerRunUseCase {
  constructor(@inject('MqProvider')
    private mqProvider: IMqProvider
  ) { }

  execute() {
    if (process.env.MQ_QUEUE && process.env.MQ_QUEUE != '') {
      this.mqProvider.worker(process.env.MQ_QUEUE)
    }
  }
}

const mqWorkerRun = () => {
  const workerRunUseCase = container.resolve(WorkerRunUseCase)

  workerRunUseCase.execute()
}

export { mqWorkerRun }
