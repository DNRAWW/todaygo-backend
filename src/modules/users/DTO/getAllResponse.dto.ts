import { UserEntity } from "../entities/user.entity";

export class GetAllResponseDto {
    data: UserEntity[];
    count: number;
}