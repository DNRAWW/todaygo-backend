import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { User } from 'src/modules/common/decorators/user.decoratoor';
import { DeleteDto } from 'src/modules/common/dto/delete.dto';
import { AuthGuard } from 'src/modules/users/guards/auth.guard';
import { UserFieldDto } from 'src/types/express/userField.dto';
import { CommentDto } from '../DTO/comment.dto';
import { CreateCommentDto } from '../DTO/createComment.dto';
import { GetAllCommentsDto } from '../DTO/getAllComments.dto';
import { CommentsService } from '../services/comments.service';
import { EventCommentsService } from '../services/eventComments.service';

@Controller('comments')
export class CommentsController {
  @Inject()
  private readonly commentsService: CommentsService;
  @Inject()
  private readonly eventCommentsService: EventCommentsService;

  // Получить всё
  @Get('get-all/:eventId/:skip')
  async getAll(@Param() params: GetAllCommentsDto) {
    return await this.eventCommentsService.findByEvent(
      params.eventId,
      params.skip,
    );
  }

  // Создать
  @Post('create')
  @UseGuards(AuthGuard)
  async create(@User() user: UserFieldDto, @Body() body: CreateCommentDto) {
    const comment = await this.commentsService.create(body, user);
    return comment.id;
  }

  // Удалить
  @Post('delete')
  @UseGuards(AuthGuard)
  async delete(@User() user: UserFieldDto, @Body() body: DeleteDto) {
    await this.commentsService.delete(body.id, user);
  }

  // Поменять
  @Post('change')
  @UseGuards(AuthGuard)
  async change(@User() user: UserFieldDto, @Body() body: CommentDto) {
    await this.commentsService.change(body, user);
  }
}
