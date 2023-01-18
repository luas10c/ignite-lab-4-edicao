import { SendNotification } from '#/application/use-cases/send-notification'
import { Body, Controller, Get, Post } from '@nestjs/common'
import { z } from 'zod'
import { NotificationMapper } from '../mappers/notification-mapper'

import { CreateNotificationBody } from '../requests/create-notification-body'

@Controller({
  path: 'notifications'
})
export class NotificationsController {
  constructor(private sendNotification: SendNotification) {}

  @Get()
  async getAll(): Promise<any> {
    return 'Hello'
  }

  @Post()
  async create(@Body() body: CreateNotificationBody): Promise<any> {
    const schema = z.object({
      content: z.string(),
      category: z.string(),
      recipientId: z.string().uuid()
    })

    const { content, category, recipientId } = await schema.parseAsync(body)

    const { notification } = await this.sendNotification.execute({
      content,
      category,
      recipientId
    })

    return {
      notification: NotificationMapper.toHTTP(notification)
    }
  }
}
