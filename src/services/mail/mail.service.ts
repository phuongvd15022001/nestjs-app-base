import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { Queue } from 'bullmq';
import { EBullQueue } from 'src/shared/constants/queue.constants';

@Injectable()
export class MailService {
  constructor(@InjectQueue(EBullQueue.MAIL) private emailQueue: Queue) {}

  async sendUserConfirmation(user: User, token: string) {
    return await this.emailQueue.add('send-mail', {
      user,
      token,
    });
  }
}
