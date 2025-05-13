import { app } from "./app"
import { mqWorkerRun } from "@shared/infra/mq/mq-worker-run"
import "dotenv/config"

const port = process.env.PORT ? Number(process.env.PORT) : 3333

app.listen(port, () => console.log(`Server is running on port ${port}!`))

mqWorkerRun()
