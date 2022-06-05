import {
  CanActivate,
  ExecutionContext,
  Injectable,
  SetMetadata,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from '../entities/user.entity';
import { Request } from 'express';

export const RequireRole = (role: Roles) => SetMetadata('requiredRole', role);

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req: Request = await context.switchToHttp().getRequest();

    const requiredRole = this.reflector.get<Roles | null>(
      'requiredRole',
      context.getHandler(),
    );

    if (!requiredRole) {
      return true;
    }

    if (requiredRole !== req.user.role && req.user.role !== Roles.ADMIN) {
      return false;
    }

    return true;
  }
}
