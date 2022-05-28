import { Type } from "class-transformer";
import { Min } from "class-validator";

export class DeleteDto {
    @Type(() => Number)
    @Min(1)
    id: number;
}