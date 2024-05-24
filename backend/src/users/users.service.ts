import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { SignInUserDto } from './dto/signIn-user.dto';
import { PrismaClient } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { JwtExpiresIn, selectUserFields, jwtCookieName } from './constants';
import { Response } from 'express';

const { users } = new PrismaClient();

@Injectable()
export class UsersService {
  constructor(private jwtService: JwtService) {}

  async signIn(signInUserDto: SignInUserDto, response: Response) {
    const { username, password } = signInUserDto;
    const user = await users.findUnique({
      where: { username },
    });

    if (!user || user.password !== password) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, username };

    const access_token = await this.jwtService.signAsync(payload);

    response.header('Set-Cookie', [
      `${jwtCookieName}=${access_token}; HttpOnly; Secure; SameSite=None; Max-Age=${JwtExpiresIn}; Path=/;`,
      'otherCookieAndParams...',
    ]);

    return { ...user, expires_in: JwtExpiresIn };
  }

  async create(createUserDto: CreateUserDto, response: Response) {
    const user = await users.findUnique({
      where: { username: createUserDto.username },
    });
    if (user) {
      throw new ConflictException('username already taken');
    }

    const newUser = await users.create({ data: createUserDto });
    const payload = { sub: newUser.id, userName: newUser.username };
    const access_token = await this.jwtService.signAsync(payload);
    response.header('Set-Cookie', [
      `${jwtCookieName}=${access_token}; HttpOnly; Secure; SameSite=None; Max-Age=${JwtExpiresIn}; Path=/;`,
    ]);

    return { ...newUser, expires_in: JwtExpiresIn };
  }

  async findAll() {
    return await users.findMany({
      select: selectUserFields,
    });
  }

  async deleteAll() {
    return await users.deleteMany();
  }
}
