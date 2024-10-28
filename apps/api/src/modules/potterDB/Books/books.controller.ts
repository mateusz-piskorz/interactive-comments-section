/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Controller, UseInterceptors } from '@nestjs/common';
import { BooksService } from './books.service';
import { TsRestHandler } from '@ts-rest/nest';
import { contract } from 'apps/shared/contract';
import { CacheInterceptor } from '@nestjs/cache-manager';

const { getBooks } = contract.poterDB.books;

@Controller()
export class BooksController {
  constructor(private readonly commentsService: BooksService) {}
  //GET /books
  // @UseGuards(AuthGuard)

  @UseInterceptors(CacheInterceptor)
  @TsRestHandler(getBooks)
  async getBooks() {
    return this.commentsService.getBooks();
  }

  async booksWithExtras() {
    return await this.getBooks();
  }
}
