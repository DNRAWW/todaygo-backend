import { Length } from 'class-validator';

export class IsVisibleNameTakenDto {
  @Length(5, 40)
  name: string;
}
