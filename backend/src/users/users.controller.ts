import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { UsersService } from './users.service';
import { SignInUserDto } from './dto/signIn-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signIn') //POST /users/signIn
  signIn(@Body(ValidationPipe) signInUserDto: SignInUserDto) {
    return this.usersService.signIn(signInUserDto);
  }

  @Post() //POST /users
  create(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(AuthGuard)
  @Get() ///GET /users
  findAll() {
    return this.usersService.findAll();
  }
}
