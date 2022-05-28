import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { DeleteDto } from 'src/modules/common/dto/delete.dto';
import { CommentDto } from '../DTO/comment.dto';
import { CreateCommentDto } from '../DTO/createComment';
import { GetAllCommentsDto } from '../DTO/getAllComments.dto';
import { CommentsService } from '../services/comments.service';
import { EventCommentsService } from '../services/eventComments.service';

@Controller('comments')
export class CommentsController {
  @Inject()
  private readonly commentsService: CommentsService;
  @Inject()
  private readonly eventCommentsService: EventCommentsService;

  @Get('get-all/:eventId/:skip')
  async getAll(@Param() params: GetAllCommentsDto) {
    return await this.eventCommentsService.findByEvent(
      params.eventId,
      params.skip,
    );
  }

  @Post('create')
  async create(@Body() body: CreateCommentDto) {
    await this.commentsService.create(body);
  }

  @Post('delete')
  async delete(@Body() body: DeleteDto) {
    await this.commentsService.delete(body.id);
  }

  @Post('change')
  async change(@Body() body: CommentDto) {
    await this.commentsService.change(body);
  }
}
