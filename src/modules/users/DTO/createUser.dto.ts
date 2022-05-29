import { Type } from 'class-transformer';
import { IsDate, IsEnum, Length } from 'class-validator';
import { Roles } from '../entities/user.entity';

export class CreateUserDto {
  @Length(3, 20)
  firstName: string;

  @Length(3, 20)
  lastName: string;

  @Length(3, 20)
  surName: string;

  @Type(() => Date)
  @IsDate()
  dateOfBirth: Date;

  @Length(5, 50)
  login: string;

  @Length(8, 25)
  password: string;

  @Length(5, 40)
  visibleName: string;
}
