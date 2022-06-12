import { Length } from 'class-validator';

export class checkPasswordDto {
  @Length(8, 25)
  password: string;
}
