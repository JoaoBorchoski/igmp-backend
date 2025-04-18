import { injectable } from 'tsyringe'
import amqp from 'amqplib/callback_api'
import { IMqProvider, Method } from '../i-mq-provider'
import { serverError } from '@shared/helpers'

@injectable()
class RabbitMqProvider implements IMqProvider {
  private credentials: any

  constructor() {
    this.credentials = { credentials: require('amqplib').credentials.plain(process.env.MQ_USER, process.env.MQ_PASS) }
  }

  sender(queue: string, method: Method, route: string, payload: string): Promise<void> {
    amqp.connect('amqp://localhost', this.credentials, (connectionError, connection) => {
      if (connectionError) {
        return serverError(connectionError)
      }

      connection.createChannel((channelError, channel) => {
        if (channelError) {
          return serverError(channelError)
        }

        channel.assertQueue(queue, {
          durable: false
        })

        const data = { method, route, payload }

        channel.sendToQueue(queue, Buffer.from(JSON.stringify(data)))
      })
    })

    return
  }
  
  worker(queue: string): Promise<void> {
    amqp.connect('amqp://localhost', this.credentials, (connectionError, connection) => {
      if (connectionError) {
        return serverError(connectionError)
      }

      connection.createChannel((channelError, channel) => {
        if (channelError) {
          return serverError(channelError)
        }

        channel.assertQueue(queue, {
          durable: false
        })

        console.log("RabbitMq Worker on queue %s is running!", queue);

        channel.consume(queue, function(msg) {
          console.log(" [x] Received %s", JSON.parse(msg.content.toString()));
        }, {
          noAck: true
        })
      })
    })

    return
  }
}

export { RabbitMqProvider }
