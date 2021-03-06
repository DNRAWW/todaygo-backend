import { Type } from 'class-transformer';
import { Min } from 'class-validator';

export class GetAllEventsDto {
  @Type(() => Number)
  @Min(1)
  cityId: number;

  @Type(() => Number)
  @Min(0)
  skip: number;
}
