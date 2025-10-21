import { MiddlewareConsumer, Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import Joi from 'joi';
import { PrismaModule } from 'src/services/prisma/prisma.module';
import { ProductsModule } from '../products/products.module';
import { LoggerMiddleware } from 'src/middlewares/logger.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env`,
      validationSchema: Joi.object({
        PORT: Joi.number().required(),
        DATABASE_URL: Joi.string().required(),
        ENV: Joi.string().required(),
      }),
    }),
    PrismaModule,
    UsersModule,
    ProductsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
