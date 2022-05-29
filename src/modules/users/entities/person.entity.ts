import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Roles } from './user.entity';

@Entity('people')
export class PersonEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  firstName: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  lastName: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  surName: string;

  @Column({
    type: 'varchar',
    nullable: false,
    unique: true,
  })
  visableName: string;

  @Column({
    type: 'varchar',
    nullable: true,
    unique: true,
  })
  orgName: string;

  @Column({
    type: 'timestamp',
    nullable: false,
  })
  dateOfBirth: Date;

  @Column({
    type: 'varchar',
    nullable: false,
    enum: Roles,
  })
  role: Roles;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  fullName: string;
}
