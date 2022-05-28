import { Type } from 'class-transformer';
import { Min } from 'class-validator';

export class GetAllCommentsDto {
  @Type(() => Number)
  @Min(0)
  eventId: number;

  @Type(() => Number)
  @Min(0)
  skip: number;
}
