import { Type } from 'class-transformer';
import { IsEnum, IsOptional, Length, MIN, Min, MinDate } from 'class-validator';
import { Timestamp } from 'typeorm';
import { Tags } from '../entities/event.entity';

export class EventDto {
  @Type(() => Number)
  @Min(1)
  id: number;

  @Length(3, 50)
  @IsOptional()
  name: string;

  @Type(() => Number)
  @Min(10)
  @IsOptional()
  maxNumberOfParticipants: number;

  @IsEnum(Tags, { each: true })
  @IsOptional()
  tags: Tags[];

  @Length(5, 500)
  @IsOptional()
  description: string;

  @Type(() => Number)
  @Min(0)
  @IsOptional()
  price: number;

  @Length(10, 300)
  @IsOptional()
  address: string;

  @Type(() => Date)
  @MinDate(new Date())
  @IsOptional()
  date: number;

  @Type(() => Number)
  @Min(1800)
  @IsOptional()
  duration: number;

  @Type(() => Number)
  @Min(1)
  @IsOptional()
  cityId: number;

  @Type(() => Number)
  @Min(1)
  @IsOptional()
  attachmentId: number;
}
