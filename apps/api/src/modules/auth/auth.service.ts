import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../utils/database/database.service';
import { TsRestException, tsRestHandler } from '@ts-rest/nest';
import { contract } from 'apps/shared/contract';
import { SessionType } from '../../constants/session';

const { getAuth, singIn, singOut } = contract.auth;

@Injectable()
export class AuthService {
  constructor(private prisma: DatabaseService) {}

  getAuth(session: SessionType) {
    return tsRestHandler(getAuth, async () => {
      if (session.user) {
        const { avatar, color, username, id } = session.user;
        return {
          status: 200,
          body: { avatar, color, username, id },
        };
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

  singOut(session: SessionType) {
    return tsRestHandler(singOut, async () => {
      session.destroy((err) => {
        if (err) {
          throw new TsRestException(singIn, {
            status: 500,
            body: { message: 'Internal server error' },
          });
        }
      });

      return { status: 201, body: { message: 'Successfully logged out' } };
    });
  }
}
