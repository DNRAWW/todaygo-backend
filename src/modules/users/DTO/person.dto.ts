import { Type } from 'class-transformer';
import { IsOptional, Length, Min } from 'class-validator';

export class PersonDto {
  @Type(() => Number)
  @Min(1)
  id: number;

  @Length(3, 20)
  @IsOptional()
  firstName: string;

  @Length(3, 20)
  @IsOptional()
  lastName: string;

  @Length(3, 20)
  @IsOptional()
  surName: string;

  @Length(5, 40)
  @IsOptional()
  visableName: string;
}
