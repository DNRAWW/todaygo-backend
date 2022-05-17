import { Roles } from "../entities/user.entity";

export class CreateUserDto {
    firstName: string;
    lastName: string;
    surName: string;
    dateOfBirth: Date;
    role: Roles;
    login: string;
    password: string;
    fullName: string;
}