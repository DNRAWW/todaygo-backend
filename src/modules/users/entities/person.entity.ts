import { Column, Entity, PrimaryColumn } from "typeorm";
import { Roles } from "./user.entity";


@Entity("People")
export class PersonEntity {
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
        nullable: true,
    })
    surName: string;

    @Column({
        type: "varchar",
        nullable: false,
        unique: true,
    })
    visableName: string;

    @Column({
        type: "varchar",
        nullable: true,
        unique: true,
    })
    orgName: string;

    @Column({
        type: "timestamp",
        nullable: false,
    })
    dateOfBirth: Date;

    @Column({
        type: "enum",
        nullable: false,
        enum: Roles,
    })
    role: Roles;

    @Column({
        type: "varchar",
        nullable: false,
    })
    fullName: string;
}