import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CommentEntity } from './comment.entity';
import { EventEntity } from './event.entity';

@Entity('event_comments')
export class EventCommentEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({
    type: 'int',
    nullable: false,
  })
  eventId: number;

  @ManyToOne(() => EventEntity, {
    onDelete: 'CASCADE',
  })
  event: EventEntity;

  @Column({
    type: 'int',
    nullable: false,
  })
  commentId: number;

  @ManyToOne(() => CommentEntity, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  comment: CommentEntity;
}
