import {
  Controller,
  UseGuards,
  // Session,
  Get,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '../../utils/auth.guard';
// import { UsersService } from './books.service';
import { BooksService } from './books.service';
// import { TsRestHandler } from '@ts-rest/nest';
// import { contract } from 'apps/shared/contract';
// import { SessionType } from '../../constants/session';
import { CacheInterceptor } from '@nestjs/cache-manager';

// const { createNewUser, getUsers } = contract.users;

//books
@Controller()
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  // @TsRestHandler(createNewUser) //POST /users

  // @UseGuards(AuthGuard)
  @UseInterceptors(CacheInterceptor)
  @Get()
  async getAllBooks() {
    return this.booksService.getAllBooks();
  }
}
