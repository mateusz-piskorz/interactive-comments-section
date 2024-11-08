import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../utils/database/database.service';
import { TsRestException, tsRestHandler } from '@ts-rest/nest';
import { contract } from 'apps/shared/contract';
import { User } from '@prisma/client';

const { createNewUser, getUsers, getUser } = contract.users;

@Injectable()
export class UsersService {
  constructor(private prisma: DatabaseService) {}

  createNewUser(session: Record<'user', User | undefined>) {
    return tsRestHandler(createNewUser, async ({ body }) => {
      const user = await this.prisma.user.findUnique({
        where: { username: body.username },
      });

      if (user) {
        throw new TsRestException(createNewUser, {
          status: 409,
          body: { message: 'username already taken' },
        });
      }

      const newUser = await this.prisma.user.create({ data: body });

      session.user = newUser;
      return { status: 201, body: newUser };
    });
  }

  getUsers() {
    return tsRestHandler(getUsers, async () => {
      const usersList = await this.prisma.user.findMany({
        select: { avatar: true, color: true, username: true },
      });
      return { status: 200, body: usersList };
    });
  }

  getUser(username: string) {
    return tsRestHandler(getUser, async () => {
      const user = await this.prisma.user.findUnique({
        where: { username },
        select: { avatar: true, color: true, username: true },
      });

      if (!user) {
        throw new TsRestException(getUser, {
          status: 404,
          body: { message: 'resource not found' },
        });
      }

      return { status: 200, body: user };
    });
  }
}
