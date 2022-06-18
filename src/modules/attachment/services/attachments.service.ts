import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { appendFile } from 'fs';
import { join } from 'path';
import { Repository } from 'typeorm';
import { AttachmentEntity } from '../entities/attachment.entity';

@Injectable()
export class AttachmentsService {
  @InjectRepository(AttachmentEntity)
  private readonly repository: Repository<AttachmentEntity>;

  async saveFile(file: Express.Multer.File): Promise<number> {
    const uniqueFileName = `${file.originalname.split('.')[0]}-${Date.now()}.${
      file.originalname.split('.')[1]
    }`;

    appendFile(
      join(__dirname, `../../../../static/${uniqueFileName}`),
      file.buffer,
      (err) => {
        if (err) {
          throw new HttpException(
            'Somthing went wrong with your file' + '\n' + err,
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }
      },
    );

    const savedFile = await this.repository.save({
      name: file.originalname,
      path: `static/${uniqueFileName}`,
    });

    return savedFile.id;
  }
}
