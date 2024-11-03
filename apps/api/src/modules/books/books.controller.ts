import { Controller, UseGuards, Get, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '../../utils/auth.guard';
import { BooksService } from './books.service';
import { contract } from 'apps/shared/contract';

import { TsRestHandler } from '@ts-rest/nest';

const { getAllBooks } = contract.books;

// /books
@Controller()
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  // GET /books
  // @UseGuards(AuthGuard)
  @TsRestHandler(getAllBooks)
  getAllChapters() {
    return this.booksService.getAllBooks();
  }
}
