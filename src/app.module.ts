import { Module } from '@nestjs/common'

import { HttpModule } from './infra/http/http.module.js'

import { MessagingModule } from './messaging/messaging.module.js'

@Module({
  imports: [HttpModule, MessagingModule]
})
export class AppModule {}
