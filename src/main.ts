import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import { urlencoded } from 'express';
import { RoleGuard } from './modules/users/guards/role.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.use(urlencoded({ extended: true }));
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  app.useGlobalGuards(app.get(RoleGuard));

  await app.listen(3000);
}
bootstrap();
