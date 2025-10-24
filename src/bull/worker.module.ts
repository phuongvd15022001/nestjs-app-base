import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { MailProcessor } from './Processor/mail.processor';
import { MailerModule } from '@nestjs-modules/mailer';
import { GLOBAL_CONFIG } from 'src/configs/global.config';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { EBullQueue } from 'src/shared/constants/queue.constants';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        secure: false,
        auth: {
          user: GLOBAL_CONFIG.email.server.auth.user,
          pass: GLOBAL_CONFIG.email.server.auth.pass,
        },
      },
      defaults: {
        from: '"No Reply" <noreply@example.com>',
      },
      template: {
        dir: join(__dirname, '../services/mail/templates'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    BullModule.forRoot({
      connection: {
        host: GLOBAL_CONFIG.redis.host,
        port: +(GLOBAL_CONFIG.redis.port ?? 6379),
      },
    }),
    BullModule.registerQueue({
      name: EBullQueue.MAIL,
    }),
  ],
  providers: [MailProcessor],
})
export class WorkerModule {}
