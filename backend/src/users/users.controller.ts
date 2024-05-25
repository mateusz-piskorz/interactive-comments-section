import {
  Controller,
  Get,
  Post,
  Body,
  ValidationPipe,
  UseGuards,
  Response,
  Delete,
} from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { UsersService } from './users.service';
import { SignInUserDto } from './dto/signIn-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { Response as Res } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signIn') //POST /users/signIn
  signIn(
    @Response({ passthrough: true }) response: Res,
    @Body(ValidationPipe) signInUserDto: SignInUserDto,
  ) {
    return this.usersService.signIn(signInUserDto, response);
  }

  @Get('deleteAll') //Delete /users/removeAll
  deleteAll() {
    return this.usersService.deleteAll();
  }

  @Post() //POST /users
  create(
    @Response({ passthrough: true }) response: Res,
    @Body(ValidationPipe) createUserDto: CreateUserDto,
  ) {
    return this.usersService.create(createUserDto, response);
  }

  @UseGuards(AuthGuard)
  @Get() //GET /users
  findAll() {
    return this.usersService.findAll();
  }
}
