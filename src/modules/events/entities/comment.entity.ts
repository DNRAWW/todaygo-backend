import { PersonEntity } from 'src/modules/users/entities/person.entity';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
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
  person: PersonEntity;

  @CreateDateColumn({
    type: 'timestamp without time zone',
    default: 'NOW()',
  })
  createdAt: Date;
}
