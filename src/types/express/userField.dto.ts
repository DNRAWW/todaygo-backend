import { Roles } from 'src/modules/users/entities/user.entity';

export class UserFieldDto {
  userId: number | null;
  personId: number | null;
  role: Roles | null;
}
