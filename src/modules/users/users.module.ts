import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PeopleController } from './controllers/people.controller';
import { UsersController } from './controllers/user.controller';
import { PersonEntity } from './entities/person.entity';
import { UserEntity } from './entities/user.entity';
import { PeopleService } from './services/people.service';
import { TokenService } from './services/token.service';
import { UsersService } from './services/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, PersonEntity]), ConfigModule],
  controllers: [UsersController, PeopleController],
  providers: [UsersService, TokenService, PeopleService],
  exports: [UsersService, PeopleService],
})
export class UserModule {}
