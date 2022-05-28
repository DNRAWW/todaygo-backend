import { Type } from 'class-transformer';
import { Min } from 'class-validator';

export class GetAllDto {
  @Type(() => Number)
  @Min(0)
  skip: number;
}
