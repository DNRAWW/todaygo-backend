import { Length } from 'class-validator';

export class ChangePasswordDto {
  @Length(8, 25)
  password: string;

  @Length(8, 25)
  newPassword: string;
}
