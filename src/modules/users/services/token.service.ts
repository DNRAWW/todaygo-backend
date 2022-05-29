import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import jwt from 'jsonwebtoken';
import { JwtTokenDto } from '../DTO/jwtToken.dto';
import { Roles } from '../entities/user.entity';

@Injectable()
export class TokenService {
  @Inject(ConfigService)
  private readonly configService: ConfigService;

  verifyToken(token: string): JwtTokenDto {
    try {
      return <JwtTokenDto>jwt.verify(
        token,
        this.configService.get('secret_key'),
        {
          algorithms: ['RS256'],
        },
      );
    } catch {
      throw Error('403');
    }
  }

  genToken(userid: number, personId: number, role: Roles): string {
    return jwt.sign(
      { userId: userid, personId: personId, role: role },
      this.configService.get('secret_key'),
      {
        algorithm: 'RS256',
      },
    );
  }
}
