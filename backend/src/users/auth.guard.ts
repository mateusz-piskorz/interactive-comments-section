import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants, jwtCookieName } from './constants';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });

      request['user'] = payload;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const cookies = request.headers?.cookie;

    if (!cookies) return undefined;

    const cookiesArr = cookies.split('; ');
    const refreshToken = cookiesArr.find((cookie) =>
      cookie.includes(jwtCookieName),
    );
    if (!refreshToken) return undefined;

    const [tokenName, token] = refreshToken.split('=');

    console.log('token');
    console.log(token);

    return token;
  }
}
