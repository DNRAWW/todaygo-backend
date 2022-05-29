import { Type } from 'class-transformer';
import { IsEnum, IsOptional, Length, Min, MinDate } from 'class-validator';
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

  @Length(5, 500)
  @IsOptional()
  description: string;

  @Type(() => Number)
  @Min(0)
  price: number;

  @Length(20, 300)
  address: string;

  @Type(() => Date)
  @MinDate(new Date())
  date: Date;

  @Type(() => Number)
  @Min(1800)
  duration: number;
}
