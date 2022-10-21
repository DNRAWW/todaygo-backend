import { Type } from 'class-transformer';
import { IsDateString, IsOptional, Min } from 'class-validator';

export class GetByDateDto {
  @IsDateString()
  date: string;

  @Type(() => Number)
  @Min(0)
  skip: number;
}
