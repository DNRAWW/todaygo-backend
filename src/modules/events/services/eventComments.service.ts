import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventCommentEntity } from '../entities/eventComment.entity';

@Injectable()
export class EventCommentsService {
  @InjectRepository(EventCommentEntity)
  private readonly repository: Repository<EventCommentEntity>;

  async findByEvent(eventId: number, skip: number) {
    const [result, total] = await this.repository.findAndCount({
      where: {
        eventId: eventId,
      },
      skip: skip,
      take: 15,
      relations: ['comment', 'comment.person'],
      order: {
        commentId: 'DESC',
      },
    });

    return {
      data: result,
      count: total,
    };
  }

  async linkComment(commentId: number, eventId: number) {
    await this.repository.save({
      commentId: commentId,
      eventId: eventId,
    });
  }
}
