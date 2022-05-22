import { Length } from "class-validator";

export class GetByNameDto {
    @Length(3, 20)
    name: string;
}