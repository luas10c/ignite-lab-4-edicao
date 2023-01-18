import { InMemoryNotificationsRepository } from '../../../tests/repositories/in-memory-notifications-repository'
import { CancelNotification } from './cancel-notification'

import { Notification } from '../entities/notification'
import { Content } from '../entities/notification/content'
import { NotificationNotFound } from './errors/notification-not-found'

describe('CancelNotification', () => {
  it('should be able cancel a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository()
    const cancelNotification = new CancelNotification(notificationsRepository)

    const notification = new Notification({
      content: new Content('Uma nova solicitação de amizade'),
      category: 'social',
      recipientId: '123'
    })

    await notificationsRepository.create(notification)

    await cancelNotification.execute({
      notificationId: notification.id
    })

    expect(notificationsRepository.notifications[0].canceledAt).toEqual(
      expect.any(Date)
    )
  })

  it('should not be able to cancel a non existing notification', async () => {
    const notificationRepository = new InMemoryNotificationsRepository()
    const cancelNotification = new CancelNotification(notificationRepository)

    await expect(
      cancelNotification.execute({
        notificationId: 'fake-notification-id'
      })
    ).rejects.toThrow(NotificationNotFound)
  })
})
