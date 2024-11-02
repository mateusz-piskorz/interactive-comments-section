import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../utils/database/database.service';
import { TsRestException, tsRestHandler } from '@ts-rest/nest';
import { contract } from 'apps/shared/contract';
import { SessionType } from '../../constants/session';

const { getAuth, singIn } = contract.auth;

@Injectable()
export class AuthService {
  constructor(private prisma: DatabaseService) {}

  getAuth(session: SessionType) {
    return tsRestHandler(getAuth, async () => {
      if (session.user) {
        return { status: 201, body: session.user };
      } else {
        throw new TsRestException(getAuth, {
          status: 401,
          body: { message: 'Unauthorized' },
        });
      }
    });
  }

  singIn(session: SessionType) {
    return tsRestHandler(singIn, async ({ body }) => {
      const { username, password } = body;

      const user = await this.prisma.user.findUnique({
        where: { username },
      });

      if (!user || user.password !== password) {
        throw new TsRestException(singIn, {
          status: 401,
          body: { message: 'Unauthorized' },
        });
      }

      session.user = user;
      return { status: 201, body: user };
    });
  }
}
