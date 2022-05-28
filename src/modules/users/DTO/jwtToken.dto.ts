import { Roles } from '../entities/user.entity';

export class JwtTokenDto {
  userId: number;
  role: Roles;
}
