import { container } from 'tsyringe'
import { IMqProvider } from './i-mq-provider'
import { RabbitMqProvider } from './implementations/rabbit-mq-provider'

const mqProvider = {
  rabbitMq: container.resolve(RabbitMqProvider)
}

container.registerInstance<IMqProvider>(
  'MqProvider',
  mqProvider[process.env.MQ_PROVIDER]
)
