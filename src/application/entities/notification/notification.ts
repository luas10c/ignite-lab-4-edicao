import { randomUUID } from 'node:crypto'

import { Content } from './content'

import type { Replace } from '../../../helpers/Replace'

type NotificationProps = {
  content: Content
  category: string
  recipientId: string
  readAt?: Date | null
  canceledAt?: Date | null
  createdAt: Date
}

export class Notification {
  private _id: string
  private props: NotificationProps
  constructor(
    props: Replace<NotificationProps, { id?: string; createdAt?: Date }>
  ) {
    this._id = randomUUID()
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date()
    }
  }

  public get id() {
    return this._id
  }

  public set recipientId(value: string) {
    this.props.recipientId = value
  }

  public get recipientId(): string {
    return this.props.recipientId
  }

  public set content(content: Content) {
    this.props.content = content
  }

  public get content(): Content {
    return this.props.content
  }

  public set category(value: string) {
    this.props.category = value
  }

  public get category() {
    return this.props.category
  }

  public set readAt(value: Date | null | undefined) {
    this.props.readAt = value
  }

  public get canceledAt() {
    return this.props.canceledAt
  }

  public cancel() {
    this.props.canceledAt = new Date()
  }

  public get readAt(): Date | null | undefined {
    return this.props.readAt
  }

  public get createdAt() {
    return this.props.createdAt
  }
}
