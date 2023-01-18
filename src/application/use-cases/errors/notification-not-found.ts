export class NotificationNotFound extends Error {
  private statusCode: number
  private code: string

  constructor() {
    super('Notification not found.')
    this.code = 'NOTIFICATION_NOT_FOUND'
    this.statusCode = 404
  }
}
