import { Length } from 'class-validator';

export class GetByLoginDto {
  @Length(5, 50)
  login: string;
}
