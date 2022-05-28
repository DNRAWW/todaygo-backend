import { Type } from 'class-transformer';
import { Length, Min } from 'class-validator';

export class UserDto {
  @Type(() => Number)
  @Min(1)
  id: number;

  @Length(5, 50)
  login: string;

  @Length(8, 25)
  password: string;
}
