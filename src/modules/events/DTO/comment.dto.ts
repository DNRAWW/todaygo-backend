import { Type } from 'class-transformer';
import { Length, Min } from 'class-validator';

export class CommentDto {
  @Type(() => Number)
  @Min(0)
  id: number;

  @Length(5, 200)
  text: string;
}
