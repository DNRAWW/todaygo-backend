import { Type } from 'class-transformer';
import { Min } from 'class-validator';

export class GetAllEventsByOrgDto {
  @Type(() => Number)
  @Min(0)
  id: number;

  @Type(() => Number)
  @Min(0)
  skip: number;
}
