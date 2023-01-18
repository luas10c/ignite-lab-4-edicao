import { Content } from './content'
import { Notification } from './notification'

describe('Notification Tests', () => {
  it('should be able to create a notification', () => {
    const notification = new Notification({
      content: new Content('Nova solicitação de amizade'),
      category: 'social',
      recipientId: 'exaple-recipient-id',
      isRead: false
    })

    expect(notification.content.value).toBe('Nova solicitação de amizade')
  })
})
