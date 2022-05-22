import { UserEntity } from "src/modules/users/entities/user.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn, Timestamp } from "typeorm";

export enum Tags {
    CULTURAL = "CULTURAL",
    EDUCATIONAL = "EDUCATIONAL",
    ENTERTAINMENT = "ENTERTAINMENT",
}

@Entity('Events')
export class EventEntity extends BaseEntity {
    @PrimaryColumn()
    id: number;

    @Column({
        type: 'varchar',
        nullable: false,
    })
    name: string;

    @Column({
        type: "int",
        nullable: false,
    })
    organizerId: number

    @ManyToOne(() => UserEntity)
    organizer: UserEntity;

    @Column({
        type: "int",
        nullable: false,
    })
    maxNumberOfParticipants: number;

    @Column({
        type: "enum",
        array: true,
        enum: Tags,
        nullable: false,
    })
    tags: Tags[];

    @Column({
        type: "varchar",
        nullable: false,
    })
    description: string;

    @CreateDateColumn({
        type: 'timestamp without time zone', 
        default: 'NOW()',
    })
    createdAt: Date;
}