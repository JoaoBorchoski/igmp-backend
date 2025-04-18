type Method = 'POST' | 'PUT' | 'PATCH' | 'GET' | 'DELETE'

interface IMqProvider {
  sender(queue: string, method: Method, route: string, payload: string): Promise<void>,
  worker(queue: string): Promise<void>
}

export { Method, IMqProvider }
