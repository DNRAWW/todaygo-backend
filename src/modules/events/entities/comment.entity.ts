import { UserEntity } from "src/modules/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn } from "typeorm";


@Entity('Comments')
export class CommentEntity {
    @PrimaryColumn()
    id: number;

    @Column({
        type: "varchar",
        nullable: false,
    })
    text: string;

    @Column({
        type: "int",
        nullable: false,
    })
    userId: number;

    @ManyToOne(() => UserEntity)
    user: UserEntity;

    @CreateDateColumn({
        type: 'timestamp without time zone', 
        default: 'NOW()',
    })
    createdAt: Date;
}