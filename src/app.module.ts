import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AttachmentsModule } from './modules/attachment/attachment.module';
import { getOrmConfig } from './modules/config/typeorm';
import { EventModule } from './modules/events/events.module';
import { RoleGuard } from './modules/users/guards/role.guard';
import { AuthMiddleware } from './modules/users/middleware/auth.middleware';
import { UserModule } from './modules/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../static'),
      serveRoot: '/static',
    }),
    TypeOrmModule.forRoot(getOrmConfig()),
    UserModule,
    EventModule,
    AttachmentsModule,
  ],
  controllers: [],
  providers: [RoleGuard],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
