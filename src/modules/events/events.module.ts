import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../users/users.module';
import { CommentEntity } from './entities/comment.entity';
import { EventEntity } from './entities/event.entity';
import { EventCommentEntity } from './entities/eventComment.entity';
import { EventParticipantEntity } from './entities/eventParticipant.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      EventEntity,
      CommentEntity,
      EventCommentEntity,
      EventParticipantEntity,
    ]),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class EventModule {}
