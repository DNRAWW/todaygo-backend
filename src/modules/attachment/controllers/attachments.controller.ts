import {
  Controller,
  Inject,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Roles } from 'src/modules/users/entities/user.entity';
import { AuthGuard } from 'src/modules/users/guards/auth.guard';
import { RequireRole } from 'src/modules/users/guards/role.guard';
import { AttachmentsService } from '../services/attachments.service';

@Controller('attachments')
export class AttachmentsController {
  @Inject()
  private readonly service: AttachmentsService;
  // Загрузить
  @Post('upload')
  @UseGuards(AuthGuard)
  @RequireRole(Roles.ORGANIZER)
  @UseInterceptors(FileInterceptor('image'))
  async uploadImage(@UploadedFile() image: Express.Multer.File) {
    return await this.service.saveFile(image); //returns id of attachment
  }
}
