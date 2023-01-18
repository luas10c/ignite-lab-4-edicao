import { Injectable } from '@nestjs/common'

import type { Notification } from '#/application/entities/notification'

import type { NotificationsRepository } from '#/application/repositories/notifications-repository'

import { PrismaService } from '../prisma.service'
import { PrismaNotificationMapper } from '../mappers/prisma-notification-mapper'

@Injectable()
export class PrismaNotificationsRepository implements NotificationsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(notificationId: string) {
    const notification = await this.prisma.notification.findUnique({
      where: { id: notificationId }
    })

    if (!notification) {
      return null
    }

    return notification
  }

  async countManyByRecipientId(recipientId: string): Promise<number> {
    const data = await this.prisma.notification.count({
      where: {
        recipientId
      }
    })
    return data
  }

  async create(notification: Notification): Promise<void> {
    const data = PrismaNotificationMapper.toPrisma(notification)

    await this.prisma.notification.create({
      data
    })
  }

  async save(notification: Notification): Promise<void> {
    //
  }
}
