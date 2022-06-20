import { PersonEntity } from 'src/modules/users/entities/person.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { EventEntity } from './event.entity';

@Entity('event_participants')
export class EventParticipantEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column()
  eventId: number;

  @ManyToOne(() => EventEntity, {
    onDelete: 'CASCADE',
  })
  event: EventEntity;

  @Column()
  personId: number;

  @ManyToOne(() => PersonEntity, {
    onDelete: 'CASCADE',
  })
  person: PersonEntity;
}
