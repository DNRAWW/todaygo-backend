import { Type } from 'class-transformer';
import { Min } from 'class-validator';

export class GetOneDto {
  @Type(() => Number)
  @Min(0)
  id: number;
}
