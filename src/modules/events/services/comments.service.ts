import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommentDto } from '../DTO/comment.dto';
import { CreateCommentDto } from '../DTO/createComment.dto';
import { CommentEntity } from '../entities/comment.entity';
import { EventCommentsService } from './eventComments.service';
import { EventsService } from './events.service';

@Injectable()
export class CommentsService {
  @InjectRepository(CommentEntity)
  private readonly repository: Repository<CommentEntity>;
  @Inject()
  private readonly eventService: EventsService;
  @Inject()
  private readonly eventCommentsService: EventCommentsService;

  async create(dto: CreateCommentDto) {
    const event = await this.eventService.findOne(dto.eventId);

    if (!event) {
      throw new HttpException('Event does not exist', HttpStatus.NOT_FOUND);
    }

    const createdComment = await this.repository.save({
      personId: dto.personId,
      text: dto.text,
    });

    await this.eventCommentsService.linkComment(createdComment.id, dto.eventId);
  }

  async change(comment: CommentDto) {
    await this.repository.save(comment);
  }

  async delete(id: number) {
    await this.repository.delete(id);
  }
}
