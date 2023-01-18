import { Injectable, OnModuleDestroy } from '@nestjs/common'
import { ServerKafka } from '@nestjs/microservices'

@Injectable()
export class KafkaConsumerService
  extends ServerKafka
  implements OnModuleDestroy
{
  constructor() {
    super({
      client: {
        clientId: 'notifications',
        brokers: ['crisp-poodle-8755-us1-kafka.upstash.io:9092'],
        sasl: {
          mechanism: 'scram-sha-256',
          username:
            'Y3Jpc3AtcG9vZGxlLTg3NTUkB0REgoBiNNzBB6TASt3S5WWnDWNtRbjbVwo_JoI',
          password:
            'eL6AJqFw1lx7VUYuKctX4FSu6HwJsCEl8RLUZKkBDJ3ID0cE6kuUYDhrRoyGEzi6hujjRQ=='
        },
        ssl: true
      }
    })
  }

  async onModuleDestroy() {
    await this.close()
  }
}
