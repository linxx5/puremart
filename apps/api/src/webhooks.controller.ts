import { Body, Controller, HttpCode, Post } from '@nestjs/common';

/** Test-run skeleton: answers 200 so Paystack test webhooks have somewhere to land. */
@Controller('webhooks')
export class WebhooksController {
  @Post('paystack')
  @HttpCode(200)
  paystack(@Body() body: unknown) {
    return { received: true };
  }
}
