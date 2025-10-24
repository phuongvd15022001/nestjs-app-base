import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { BullModule } from '@nestjs/bullmq';
import { EBullQueue } from 'src/shared/constants/queue.constants';

@Module({
  imports: [
    BullModule.registerQueue({
      name: EBullQueue.MAIL,
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
