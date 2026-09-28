import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { WebhooksController } from './webhooks.controller';

@Module({
  controllers: [HealthController, WebhooksController],
})
export class AppModule {}
