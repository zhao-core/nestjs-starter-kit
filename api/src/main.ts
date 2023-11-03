import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AppLoggerService } from './logger/services/app-logger/app-logger.service';
import * as bodyParser from 'body-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /*
    Required to be executed before async storage middleware
    and not loose context on POST requests
   */
  app.use(bodyParser.json());

  app.enableShutdownHooks();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  const logger = app.get(AppLoggerService);
  app.useLogger(logger);

  // API docs
  const config = new DocumentBuilder()
    .setTitle('Node API')
    .setDescription(
      `<a
         target="_blank"
         href="https://github.com/zhao-core/nestjs-starter-kit"
       >https://github.com/zhao-core/nestjs-starter-kit</a>`,
    )
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  const port = process.env.PORT || 9797;

  await app.listen(port, '0.0.0.0');

  logger.log(`App started on http://localhost:${port}`);
  logger.log(`Swagger Document started on http://localhost:${port}/swagger`);
}

bootstrap();
