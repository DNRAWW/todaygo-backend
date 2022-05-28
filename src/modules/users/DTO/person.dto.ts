import { Type } from 'class-transformer';
import { Length, Min } from 'class-validator';

export class PersonDto {
  @Type(() => Number)
  @Min(1)
  id: number;

  @Length(3, 20)
  firstName: string;

  @Length(3, 20)
  lastName: string;

  @Length(3, 20)
  surName: string;

  @Length(5, 40)
  visableName: string;
}
