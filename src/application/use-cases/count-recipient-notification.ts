import { NotificationsRepository } from '../repositories/notifications-repository'

interface Request {
  recipientId: string
}

interface Response {
  count: number
}

export class CountRecipientNotification {
  constructor(
    private readonly notificationsRepository: NotificationsRepository
  ) {}

  async execute(request: Request): Promise<Response> {
    const { recipientId } = request

    const count = await this.notificationsRepository.countManyByRecipientId(
      recipientId
    )

    return {
      count
    }
  }
}
