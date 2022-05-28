import { PersonEntity } from 'src/modules/users/entities/person.entity';
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { EventEntity } from './event.entity';

@Entity('event_participants')
export class EventParticipantEntity {
  @PrimaryColumn()
  id: number;

  @Column()
  eventId: number;

  @ManyToOne(() => EventEntity)
  event: EventEntity;

  @Column()
  personId: number;

  @ManyToOne(() => PersonEntity)
  person: PersonEntity;
}
