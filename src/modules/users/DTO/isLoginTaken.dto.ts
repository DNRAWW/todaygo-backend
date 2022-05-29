import { Length } from 'class-validator';

export class IsLoginTakenDto {
  @Length(5, 50)
  login: string;
}
