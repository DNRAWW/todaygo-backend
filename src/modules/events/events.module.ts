import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CommentEntity } from "./entities/comment.entity";
import { EventEntity } from "./entities/event.entity";

@Module({
    imports: [TypeOrmModule.forFeature([EventEntity, CommentEntity])],
    controllers: [],
    providers: [],
})
export class EventModule {};