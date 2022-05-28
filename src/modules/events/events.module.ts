import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../users/users.module';
import { CommentsController } from './controllers/comments.controller';
import { EventsController } from './controllers/events.controller';
import { CommentEntity } from './entities/comment.entity';
import { EventEntity } from './entities/event.entity';
import { EventCommentEntity } from './entities/eventComment.entity';
import { EventParticipantEntity } from './entities/eventParticipant.entity';
import { CommentsService } from './services/comments.service';
import { EventCommentsService } from './services/eventComments.service';
import { EventParticipantsService } from './services/eventParticipants.service';
import { EventsService } from './services/events.service';

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
  controllers: [EventsController, CommentsController],
  providers: [
    CommentsService,
    EventCommentsService,
    EventParticipantsService,
    EventsService,
  ],
})
export class EventModule {}
