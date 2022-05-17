import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";

export enum Roles {
    REGULAR_USER = "REGULAR_USER",
    ORGANIZER = "ORGANIZER",
    ADMIN = "ADMIN"
}

@Entity('Users')
export class UserEntity extends BaseEntity {
    @PrimaryColumn()
    id: number;
    
    @Column({
        type: "varchar",
        nullable: false,
    })
    firstName: string;
    
    @Column({
        type: "varchar",
        nullable: false,
    })
    lastName: string;

    @Column({
        type: "varchar",
        nullable: false,
    })
    surName: string;

    @Column({
        type: "timestamp",
        nullable: false,
    })
    dateOfBirth: Date;

    @Column({
        type: "varchar",
        nullable: false,
        enum: Roles,
    })
    role: Roles;

    @Column({
        type: "varchar",
        nullable: false,
        unique: true,
    })
    login: string;

    @Column({
        type: "varchar",
        nullable: false,
    })
    password: string;

    @Column({
        type: "varchar",
        nullable: false,
    })
    fullName: string;
}