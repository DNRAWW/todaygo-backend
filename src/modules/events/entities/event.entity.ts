import { UserEntity } from 'src/modules/users/entities/user.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Timestamp,
} from 'typeorm';

export enum Tags {
  CULTURAL = 'CULTURAL',
  EDUCATIONAL = 'EDUCATIONAL',
  ENTERTAINMENT = 'ENTERTAINMENT',
}

@Entity('events')
export class EventEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  name: string;

  @Column({
    type: 'int',
    nullable: false,
  })
  organizerId: number;

  @ManyToOne(() => UserEntity, {
    onDelete: 'CASCADE',
  })
  organizer: UserEntity;

  @Column({
    type: 'int',
    nullable: false,
  })
  maxNumberOfParticipants: number;

  @Column({
    type: 'enum',
    array: true,
    enum: Tags,
    nullable: false,
  })
  tags: Tags[];

  @Column({
    type: 'varchar',
    nullable: true,
  })
  description: string;

  @CreateDateColumn({
    type: 'timestamp without time zone',
    default: 'NOW()',
  })
  createdAt: Date;

  @Column({
    type: 'int',
    nullable: false,
  })
  price: number;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  address: string;

  @Column({
    type: 'timestamp',
    nullable: false,
  })
  date: Date;

  @Column({
    type: 'int',
    default: 0,
    nullable: false,
  })
  numberOfParticipants: number;

  @Column({
    type: 'int',
    nullable: false,
  })
  duration: number;
}
