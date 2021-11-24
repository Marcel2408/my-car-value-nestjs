import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //strips any prop that is sent in the body and not included in the Dto validator
    }),
  ); //* global validation for every incoming request, only works if I add validation rules to the handlers
  await app.listen(3000);
}
bootstrap();
