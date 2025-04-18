import { app } from './app'
import { mqWorkerRun } from '@shared/infra/mq/mq-worker-run'

app.listen(3333, () => console.log('Server is running!'))

mqWorkerRun()
