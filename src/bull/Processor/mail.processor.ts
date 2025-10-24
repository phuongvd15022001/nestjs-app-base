import { MailerService } from '@nestjs-modules/mailer';
import { Processor, WorkerHost, OnWorkerEvent } from '@nestjs/bullmq';
import { User } from '@prisma/client';
import { Job } from 'bullmq';
import { EBullQueue } from 'src/shared/constants/queue.constants';

@Processor(EBullQueue.MAIL)
export class MailProcessor extends WorkerHost {
  constructor(private mailerService: MailerService) {
    super();
  }

  async process(job: Job<{ user: User; token: string }>) {
    const { user, token } = job.data;
    console.log('📩 Processing job:', user.email);

    const url = `example.com/auth/confirm?token=${token}`;
    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Welcome to Nice App! Confirm your Email',
      template: './confirmation',
      context: {
        name: user.name,
        url,
      },
    });
    console.log('✅ Email sent successfully to:', user.email);

    return { success: true };
  }

  @OnWorkerEvent('completed')
  onCompleted(job: Job) {
    console.log(`🎉 Job ${job.id} completed`);
  }

  @OnWorkerEvent('failed')
  onFailed(job: Job, err: Error) {
    console.error(`❌ Job ${job.id} error:`, err.message);
  }
}
