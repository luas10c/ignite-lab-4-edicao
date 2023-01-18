import { SendNotification } from './send-notification'

import { InMemoryNotificationsRepository } from '../../../tests/repositories/in-memory-notifications-repository'

describe('SendNotification Tests', () => {
  it('should be able to send notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository()
    const sendNotification = new SendNotification(notificationsRepository)

    const { notification } = await sendNotification.execute({
      content: 'This in notification',
      category: 'social',
      recipientId: '123'
    })

    expect(notificationsRepository.notifications).toHaveLength(1)
    expect(notificationsRepository.notifications).toStrictEqual(
      expect.arrayContaining([notification])
    )
  })
})
