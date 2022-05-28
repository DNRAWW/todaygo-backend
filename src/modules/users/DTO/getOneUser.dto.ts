import { Type } from 'class-transformer';
import { IsNumber, Min } from 'class-validator';

export class GetOneDto {
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  id: number;
}
