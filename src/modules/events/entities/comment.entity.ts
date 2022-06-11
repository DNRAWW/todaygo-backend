import { PersonEntity } from 'src/modules/users/entities/person.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('comments')
export class CommentEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  text: string;

  @Column()
  personId: number;

  @ManyToOne(() => PersonEntity, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  person: PersonEntity;

  @CreateDateColumn({
    type: 'timestamp without time zone',
    default: 'NOW()',
  })
  createdAt: Date;
}
