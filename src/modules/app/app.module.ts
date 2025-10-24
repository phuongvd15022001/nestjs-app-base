import { MiddlewareConsumer, Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import Joi from 'joi';
import { PrismaModule } from 'src/services/prisma/prisma.module';
import { ProductsModule } from '../products/products.module';
import { LoggerMiddleware } from 'src/middlewares/logger.middleware';
import { AuthModule } from 'src/auth/auth.module';
import { MailModule } from 'src/services/mail/mail.module';
import { TasksService } from 'src/schedule/tasks.service';
import { ScheduleModule } from '@nestjs/schedule';
import { UploadFileModule } from '../upload-file/upload-file.module';
import { CacheModule } from '@nestjs/cache-manager';
import { redisConfig } from 'src/configs/redis.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env`,
      validationSchema: Joi.object({
        PORT: Joi.number().required(),
        DATABASE_URL: Joi.string().required(),
        ENV: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        EMAIL: Joi.string().required(),
        APP_PASSWORD: Joi.string().required(),
        AWS_ACCESS_KEY_ID: Joi.string().required(),
        AWS_SECRET_ACCESS_KEY: Joi.string().required(),
        AWS_S3_BUCKET: Joi.string().required(),
        AWS_REGION: Joi.string().required(),
      }),
    }),
    CacheModule.registerAsync({
      useFactory: () => redisConfig,
      isGlobal: true,
    }),
    PrismaModule,
    UsersModule,
    ProductsModule,
    AuthModule,
    MailModule,
    UploadFileModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService, TasksService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
