import { Type } from 'class-transformer';
import { IsOptional, Length, Min } from 'class-validator';

export class UserDto {
  @Type(() => Number)
  @Min(1)
  id: number;

  @Length(5, 50)
  @IsOptional()
  login: string;

  @Length(8, 25)
  @IsOptional()
  password: string;
}
