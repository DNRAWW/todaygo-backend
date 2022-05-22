import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from  'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import { urlencoded } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.use(urlencoded({extended: true}));
  app.useGlobalPipes(new ValidationPipe({
    transform: true
  }));
  
  await app.listen(3000);
}
bootstrap();
