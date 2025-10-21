import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { GLOBAL_CONFIG } from './configs/global.config';
import cors from 'cors';
import { AllExceptionsFilter } from './filters/all.exceptions.filter';
import { InvalidFormExceptionFilter } from './filters/invalid.form.exception.filter';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Swagger
  if (GLOBAL_CONFIG.swagger.enabled) {
    const config = new DocumentBuilder()
      .setTitle(GLOBAL_CONFIG.swagger.title ?? 'Nest App Base')
      .setDescription(GLOBAL_CONFIG.swagger.description ?? 'API Documentation')
      .setVersion(GLOBAL_CONFIG.swagger.version ?? '1.0')
      .addBearerAuth()
      .addSecurityRequirements('bearer')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup(
      GLOBAL_CONFIG.swagger.path ?? 'api/docs',
      app,
      document,
      {
        swaggerOptions: { persistAuthorization: true },
      },
    );
  }

  // Cors
  if (GLOBAL_CONFIG.cors.enabled) {
    app.use(
      cors({
        origin: GLOBAL_CONFIG.cors.origin,
        methods: GLOBAL_CONFIG.cors.methods,
        credentials: GLOBAL_CONFIG.cors.credentials,
      }),
    );
  }

  // Exception
  app.useGlobalFilters(
    new AllExceptionsFilter(app.get(HttpAdapterHost)),
    new InvalidFormExceptionFilter(),
  );

  // Helmet
  app.use(helmet());

  await app.listen(GLOBAL_CONFIG.nest.port ?? 3000);
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
