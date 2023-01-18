import { Injectable } from '@nestjs/common'

import { Notification } from '../entities/notification'

import { Content } from '../entities/notification/content'

import { NotificationsRepository } from '../repositories/notifications-repository'

interface SendNotificationRequest {
  recipientId: string
  content: string
  category: string
}

interface SendNotificationResponse {
  notification: Notification
}

@Injectable()
export class SendNotification {
  constructor(
    private readonly notificationsRepository: NotificationsRepository
  ) {}

  async execute(
    request: SendNotificationRequest
  ): Promise<SendNotificationResponse> {
    const { content, category, recipientId } = request

    const notification = new Notification({
      content: new Content(content),
      category,
      recipientId
    })

    // Persistir essa notificação no banco de dados
    await this.notificationsRepository.create(notification)

    return { notification }
  }
}
