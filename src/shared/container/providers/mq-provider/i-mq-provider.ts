type Method = "POST" | "PUT" | "PATCH" | "GET" | "DELETE"

interface IMqProvider {
	sender(queue: string, method: Method, route: string, payload: string): Promise<void>
	worker(queue: string): Promise<void>
	sendJob(queue: string, jobData: any): Promise<void>
	consumeJobs(queue: string, onMessage: (msg: any) => Promise<void>): Promise<void>
}

export { Method, IMqProvider }
