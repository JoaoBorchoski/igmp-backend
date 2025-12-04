import { injectable } from "tsyringe"
import amqp from "amqplib/callback_api"
import { IMqProvider, Method } from "../i-mq-provider"
import { serverError } from "@shared/helpers"

@injectable()
class RabbitMqProvider implements IMqProvider {
	private credentials: any
	private connectionString: string

	constructor() {
		const mqUser = process.env.MQ_USER || "guest"
		const mqPass = process.env.MQ_PASS || "guest"
		const mqHost = process.env.MQ_HOST || "localhost"
		const mqPort = process.env.MQ_PORT || "5672"

		this.connectionString = `amqp://${mqUser}:${mqPass}@${mqHost}:${mqPort}`
		this.credentials = {
			credentials: require("amqplib").credentials.plain(mqUser, mqPass),
		}
	}

	sender(queue: string, method: Method, route: string, payload: string): Promise<void> {
		return new Promise((resolve, reject) => {
			amqp.connect(this.connectionString, this.credentials, (connectionError, connection) => {
				if (connectionError) {
					console.error("Error connecting to RabbitMQ:", connectionError)
					return reject(connectionError)
				}

				connection.createChannel((channelError, channel) => {
					if (channelError) {
						connection.close()
						return reject(channelError)
					}

					channel.assertQueue(queue, {
						durable: true, // Fila persistente
					})

					const data = { method, route, payload }

					channel.sendToQueue(queue, Buffer.from(JSON.stringify(data)), {
						persistent: true, // Mensagem persistente
					})

					console.log(`[RabbitMQ] Message sent to queue: ${queue}`)

					setTimeout(() => {
						channel.close()
						connection.close()
						resolve()
					}, 500)
				})
			})
		})
	}

	// Método para enviar jobs genéricos (não apenas HTTP requests)
	async sendJob(queue: string, jobData: any): Promise<void> {
		return new Promise((resolve, reject) => {
			amqp.connect(this.connectionString, this.credentials, (connectionError, connection) => {
				if (connectionError) {
					console.error("Error connecting to RabbitMQ:", connectionError)
					return reject(connectionError)
				}

				connection.createChannel((channelError, channel) => {
					if (channelError) {
						connection.close()
						return reject(channelError)
					}

					channel.assertQueue(queue, {
						durable: true, // Fila persistente
					})

					channel.sendToQueue(queue, Buffer.from(JSON.stringify(jobData)), {
						persistent: true, // Mensagem persistente
					})

					console.log(`[RabbitMQ] Job sent to queue: ${queue}`)

					setTimeout(() => {
						channel.close()
						connection.close()
						resolve()
					}, 500)
				})
			})
		})
	}

	// Método para consumir jobs com callback
	async consumeJobs(queue: string, onMessage: (msg: any) => Promise<void>): Promise<void> {
		amqp.connect(this.connectionString, this.credentials, (connectionError, connection) => {
			if (connectionError) {
				console.error("Error connecting to RabbitMQ:", connectionError)
				return
			}

			connection.on("error", (err) => {
				console.error("RabbitMQ connection error:", err)
			})

			connection.createChannel((channelError, channel) => {
				if (channelError) {
					console.error("Error creating channel:", channelError)
					return
				}

				channel.assertQueue(queue, {
					durable: true, // Fila persistente
				})

				// Processar uma mensagem por vez
				channel.prefetch(1)

				console.log(`[RabbitMQ] Worker listening on queue: ${queue}`)

				channel.consume(
					queue,
					async (msg) => {
						if (!msg) return

						try {
							const content = JSON.parse(msg.content.toString())
							console.log(`[RabbitMQ] Processing job from queue: ${queue}`)

							await onMessage(content)

							channel.ack(msg) // Confirma processamento
							console.log(`[RabbitMQ] Job processed successfully from queue: ${queue}`)
						} catch (error) {
							console.error(`[RabbitMQ] Error processing job from queue ${queue}:`, error)
							// Rejeita a mensagem e a recoloca na fila
							channel.nack(msg, false, true)
						}
					},
					{
						noAck: false, // Confirmação manual
					}
				)
			})
		})
	}

	worker(queue: string): Promise<void> {
		amqp.connect(this.connectionString, this.credentials, (connectionError, connection) => {
			if (connectionError) {
				return serverError(connectionError)
			}

			connection.createChannel((channelError, channel) => {
				if (channelError) {
					return serverError(channelError)
				}

				channel.assertQueue(queue, {
					durable: false,
				})

				console.log("RabbitMq Worker on queue %s is running!", queue)

				channel.consume(
					queue,
					function (msg) {
						console.log(" [x] Received %s", JSON.parse(msg.content.toString()))
					},
					{
						noAck: true,
					}
				)
			})
		})

		return
	}
}

export { RabbitMqProvider }
