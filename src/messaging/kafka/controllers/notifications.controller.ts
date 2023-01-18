import { SendNotification } from '#/application/use-cases/send-notification'
import { Controller } from '@nestjs/common'
import { EventPattern, Payload } from '@nestjs/microservices'

interface SendNotificationPayload {
  content: string
  category: string
  recipientId: string
}

@Controller()
export class NotificationsController {
  constructor(private readonly sendNotification: SendNotification) {}

  @EventPattern('notifications.send-notification')
  async handleSendNotification(@Payload() payload: SendNotificationPayload) {
    const { content, category, recipientId } = payload

    const { notification } = await this.sendNotification.execute({
      content,
      category,
      recipientId
    })

    console.log(notification)
  }
}
