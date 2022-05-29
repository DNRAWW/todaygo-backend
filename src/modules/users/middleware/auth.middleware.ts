import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { TokenService } from '../services/token.service';
import { UsersService } from '../services/users.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  @Inject()
  private readonly usersService: UsersService;
  @Inject()
  private readonly tokenService: TokenService;

  async use(req: Request, res: Response, next: NextFunction) {
    if (!req.cookies.token) {
      req.user = {
        userId: null,
        personId: null,
        role: null,
      };
      next();
    }

    try {
      const result = this.tokenService.verifyToken(req.cookies.token);
      const user = await this.usersService.findOne(result.userId);

      if (!user) {
        req.user = {
          userId: null,
          personId: null,
          role: null,
        };

        next();
      }

      req.user = {
        userId: result.userId,
        personId: result.personId,
        role: result.role,
      };
    } catch {
      req.user = {
        userId: null,
        personId: null,
        role: null,
      };
    } finally {
      next();
    }
  }
}
