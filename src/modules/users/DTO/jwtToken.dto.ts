import { Roles } from '../entities/user.entity';

export class JwtTokenDto {
  userId: number;
  personId: number;
  role: Roles;
}
