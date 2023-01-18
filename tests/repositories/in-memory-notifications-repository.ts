import { Notification } from '#/application/entities/notification'
import { NotificationsRepository } from '#/application/repositories/notifications-repository'

export class InMemoryNotificationsRepository
  implements NotificationsRepository
{
  public notifications: Notification[] = []

  async findById(notificationId: string): Promise<Notification | null> {
    const notification = this.notifications.find((notification) => {
      return notification.id === notificationId
    })

    if (!notification) {
      return null
    }

    return notification
  }

  async countManyByRecipientId(recipientId: string): Promise<number> {
    const total = this.notifications.filter(
      (notification) => notification.recipientId === recipientId
    )

    return total.length
  }

  async create(notification: Notification): Promise<void> {
    this.notifications.push(notification)
  }

  async save(notification: Notification): Promise<void> {
    const notificationIndex = this.notifications.findIndex((item) => {
      return item.id === notification.id
    })

    if (notificationIndex >= 0) {
      return
    }

    this.notifications[notificationIndex] = notification
  }
}