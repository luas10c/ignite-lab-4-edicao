import { Notification as RawNotification } from '@prisma/client'
import { Notification } from '#/application/entities/notification'
import { Content } from '#/application/entities/notification/content'

export class PrismaNotificationMapper {
  static toPrisma(notification: Notification) {
    return {
      id: notification.id,
      content: notification.content.value,
      category: notification.category,
      recipientId: notification.recipientId,
      createdAt: notification.createdAt
    }
  }

  static toDomain(raw: RawNotification): Notification {
    const notification = new Notification({
      category: raw.category,
      content: new Content(raw.content),
      recipientId: raw.recipientId,
      readAt: raw.readAt,
      canceledAt: raw.canceledAt,
      createdAt: raw.createdAt
    })

    return notification
  }
}
