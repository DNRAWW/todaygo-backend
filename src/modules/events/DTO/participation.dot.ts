import { Type } from 'class-transformer';
import { Min } from 'class-validator';

export class ParticipationDto {
  @Type(() => Number)
  @Min(0)
  eventId: number;

  @Type(() => Number)
  @Min(0)
  personId: number;
}
