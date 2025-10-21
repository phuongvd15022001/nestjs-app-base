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
      }),
    }),
    PrismaModule,
    UsersModule,
    ProductsModule,
    AuthModule,
    MailModule,
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
