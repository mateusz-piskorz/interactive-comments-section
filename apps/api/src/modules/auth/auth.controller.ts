import { Controller, Session } from '@nestjs/common';
import { TsRestHandler } from '@ts-rest/nest';
import { AuthService } from './auth.service';
import { contract } from 'apps/shared/contract';
import { SessionType } from '../../constants/session';

const { getAuth, singIn, singOut } = contract.auth;

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @TsRestHandler(getAuth) //GET /auth
  async getAuth(@Session() session: SessionType) {
    return this.authService.getAuth(session);
  }

  @TsRestHandler(singIn) //GET /auth/singIn
  async singIn(@Session() session: SessionType) {
    return this.authService.singIn(session);
  }

  @TsRestHandler(singOut) //POST /auth/singOut
  async singOut(@Session() session: SessionType) {
    return this.authService.singOut(session);
  }
}
