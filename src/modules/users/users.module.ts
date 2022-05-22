import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersController } from "./controllers/user.controller";
import { PersonEntity } from "./entities/person.entity";
import { UserEntity } from "./entities/user.entity";
import { TokenService } from "./services/token.service";
import { UsersService } from "./services/users.service";

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity, PersonEntity]), ConfigModule],
    controllers: [UsersController],
    providers: [UsersService, TokenService],
})
export class UserModule {};