import { Type } from 'class-transformer';
import { IsEnum, IsOptional, Length, Min } from 'class-validator';
import { Roles } from '../entities/user.entity';

export class ChangeRoleDto {
  @Type(() => Number)
  @Min(0)
  id: number;

  @IsEnum(Roles)
  role: Roles;

  @Length(3, 50)
  @IsOptional()
  orgName?: string;
}
