import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('cities')
export class CityEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false })
  name: string;
}
