import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getOrmConfig } from './modules/config/typeorm';
import { UserModule } from './modules/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env"
    }), 
    TypeOrmModule.forRoot(getOrmConfig()),
    UserModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
