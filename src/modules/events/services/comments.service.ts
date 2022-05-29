import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Roles } from 'src/modules/users/entities/user.entity';
import { UserFieldDto } from 'src/types/express/userField.dto';
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

  async change(comment: CommentDto, user: UserFieldDto) {
    const commentById = await this.repository.findOne(comment.id);

    if (!commentById) {
      throw new HttpException('Comment not found', HttpStatus.NOT_FOUND);
    }

    if (commentById.personId !== user.personId) {
      throw new HttpException('Not authorized', HttpStatus.UNAUTHORIZED);
    }

    await this.repository.save(comment);
  }

  async delete(id: number, user: UserFieldDto) {
    const commentById = await this.repository.findOne(id);

    if (!commentById) {
      return;
    }

    if (commentById.personId !== user.personId && user.role !== Roles.ADMIN) {
      throw new HttpException('Not authorized', HttpStatus.UNAUTHORIZED);
    }

    await this.repository.delete(id);
  }
}
