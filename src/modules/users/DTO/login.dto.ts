import { Length } from 'class-validator';

export class LoginDto {
  @Length(5, 50)
  login: string;

  @Length(8, 25)
  password: string;
}
