import { Type } from 'class-transformer';
import { IsEnum, Length, Min, MinDate } from 'class-validator';
import { Tags } from '../entities/event.entity';

export class CreateEventDto {
  @Length(3, 50)
  name: string;

  @Type(() => Number)
  @Min(1)
  organizerId: number;

  @Type(() => Number)
  @Min(10)
  maxNumberOfParticipants: number;

  @IsEnum(Tags, { each: true })
  tags: Tags[];

  @Length(20, 500)
  description: string;

  @Type(() => Number)
  @Min(0)
  price: number;

  @Length(20, 300)
  address: string;

  @Type(() => Number)
  @Min(Date.now())
  date: number;

  @Type(() => Number)
  @Min(1800)
  duration: number;
}
