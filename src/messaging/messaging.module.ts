import { Module } from '@nestjs/common'

import { NotificationsController } from './kafka/controllers/notifications.controller'
import { KafkaConsumerService } from './kafka/kafka-consumer.service'

import { DatabaseModule } from '#/infra/database/database.module'

import { SendNotification } from '#/application/use-cases/send-notification'

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationsController],
  providers: [KafkaConsumerService, SendNotification]
})
export class MessagingModule {}
