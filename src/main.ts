import { NestFactory } from '@nestjs/core'

import { AppModule } from './app.module.js'

import { ZodFilter } from './shared/filters/zod.filter.js'
import { KafkaConsumerService } from './messaging/kafka/kafka-consumer.service.js'
import { MicroserviceOptions } from '@nestjs/microservices'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.useGlobalFilters(new ZodFilter())

  const kafkaConsumerService = app.get(KafkaConsumerService)

  app.connectMicroservice<MicroserviceOptions>({
    strategy: kafkaConsumerService
  })

  app.startAllMicroservices()

  await app.listen(4444, '0.0.0')
}

bootstrap()
