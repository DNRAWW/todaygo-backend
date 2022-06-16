import { Type } from 'class-transformer';
import { IsString, Min } from 'class-validator';

export class GetEventByNameDto {
  @IsString()
  query: string;

  @Type(() => Number)
  @Min(0)
  skip: number;

  @Type(() => Number)
  @Min(1)
  cityId: number;
}
