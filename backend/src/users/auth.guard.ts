import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  createParamDecorator,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants, jwtCookieName } from './constants';
import { Request } from 'express';
import { PrismaClient } from '@prisma/client';

const { users } = new PrismaClient();

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
      const userId = payload.sub;
      const user = await users.findUnique({ where: { id: userId } });

      if (!user) {
        throw new UnauthorizedException();
      }

      request['user'] = user;
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

    return token;
  }
}

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
