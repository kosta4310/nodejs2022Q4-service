import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { readFile } from 'node:fs/promises';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { join } from 'node:path';

import { LoggerMiddleware } from './logger/logger.middleware';
import { LoggerModule } from './logger/logger.module';
dotenv.config();
const PORT = process.env.PORT || 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  const document = JSON.parse(
    (await readFile(join(process.cwd(), './doc/openapi.json'))).toString(
      'utf-8',
    ),
  );
  SwaggerModule.setup('api', app, document);

  await app.listen(PORT);
  console.log(`Application is running on port ${PORT}`);
}
bootstrap();
