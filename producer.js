const { Kafka } = require('kafkajs')
const { randomUUID } = require('node:crypto')

async function bootstrap() {
  const kafka = new Kafka({
    brokers: ['crisp-poodle-8755-us1-kafka.upstash.io:9092'],
    sasl: {
      mechanism: 'scram-sha-256',
      username:
        'Y3Jpc3AtcG9vZGxlLTg3NTUkB0REgoBiNNzBB6TASt3S5WWnDWNtRbjbVwo_JoI',
      password:
        'eL6AJqFw1lx7VUYuKctX4FSu6HwJsCEl8RLUZKkBDJ3ID0cE6kuUYDhrRoyGEzi6hujjRQ=='
    },
    ssl: true
  })

  const producer = kafka.producer()
  await producer.connect()

  await producer.send({
    topic: 'notifications.send-notification',
    messages: [
      {
        value: JSON.stringify({
          content: 'Nova solicitação de amizade',
          category: 'social',
          recipientId: randomUUID()
        })
      }
    ]
  })

  await producer.disconnect()
}

bootstrap()
