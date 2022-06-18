import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsOptional,
  Length,
  Min,
  MinDate,
} from 'class-validator';
import { Tags } from '../entities/event.entity';

export class CreateEventDto {
  @Length(3, 50)
  name: string;

  @Type(() => Number)
  @Min(10)
  maxNumberOfParticipants: number;

  @IsArray()
  @IsEnum(Tags, { each: true })
  tags: Tags[];

  @Length(5, 500)
  @IsOptional()
  description: string;

  @Type(() => Number)
  @Min(0)
  price: number;

  @Length(10, 300)
  address: string;

  @Type(() => Date)
  @MinDate(new Date(new Date().toISOString().split('T')[0]))
  date: Date;

  @Type(() => Number)
  @Min(1800)
  duration: number;

  @Type(() => Number)
  @Min(1)
  cityId: number;

  @Type(() => Number)
  @Min(1)
  attachmentId: number;
}
