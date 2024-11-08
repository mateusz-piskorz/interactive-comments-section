import { Controller, UseGuards, Session, Param } from '@nestjs/common';
import { AuthGuard } from '../../utils/auth.guard';
import { UsersService } from './users.service';
import { TsRestHandler } from '@ts-rest/nest';
import { contract } from 'apps/shared/contract';
import { SessionType } from '../../constants/session';

const { createNewUser, getUsers, getUser } = contract.users;

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @TsRestHandler(createNewUser) //POST /users
  async createNewUser(@Session() session: SessionType) {
    return this.usersService.createNewUser(session);
  }

  @UseGuards(AuthGuard)
  @TsRestHandler(getUsers) //GET /users
  async getUsers() {
    return this.usersService.getUsers();
  }

  @TsRestHandler(getUser) //GET /user/:username
  async getUser(@Param('username') username: string) {
    return this.usersService.getUser(username);
  }
}
