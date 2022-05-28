import { Type } from 'class-transformer';
import { Length, Min } from 'class-validator';

export class CreateCommentDto {
  @Type(() => Number)
  @Min(0)
  personId: number;

  @Type(() => Number)
  @Min(0)
  eventId: number;

  @Length(5, 200)
  text: string;
}
